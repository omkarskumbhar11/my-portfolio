import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Upload, Wand2, RefreshCw, Image as ImageIcon, X, ShieldCheck, AlertCircle, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export default function ImageEditor({ onActiveChange }: { onActiveChange?: (active: boolean) => void }) {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasSelectedKey, setHasSelectedKey] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onActiveChange?.(isProcessing || !!image);
  }, [isProcessing, image, onActiveChange]);

  useEffect(() => {
    const checkKey = async () => {
      try {
        if (window.aistudio?.hasSelectedApiKey) {
          const selected = await window.aistudio.hasSelectedApiKey();
          setHasSelectedKey(selected);
        }
      } catch (err) {
        console.error("Error checking API key status:", err);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    try {
      if (window.aistudio?.openSelectKey) {
        await window.aistudio.openSelectKey();
        // Assume success and check again
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasSelectedKey(selected);
      }
    } catch (err) {
      console.error("Error opening key selection:", err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size too large. Please upload an image under 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResultImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async () => {
    if (!image || !prompt) return;

    setIsProcessing(true);
    setError(null);

    const maxRetries = 2;
    let retryCount = 0;

    const callApi = async (): Promise<boolean> => {
      try {
        // Use the selected key if available, otherwise fallback to environment key
        // Note: process.env.GEMINI_API_KEY is automatically updated when a key is selected
        const apiKey = process.env.GEMINI_API_KEY;
        
        if (!apiKey) {
          setError("API Key is missing. Please select an API key to continue.");
          return false;
        }

        const ai = new GoogleGenAI({ apiKey });
        const base64Data = image.split(',')[1];
        const mimeType = image.split(';')[0].split(':')[1];

        // Use 3.1 for better quality if key is selected, otherwise 2.5
        const modelName = hasSelectedKey ? 'gemini-3.1-flash-image-preview' : 'gemini-2.5-flash-image';

        const response = await ai.models.generateContent({
          model: modelName,
          contents: {
            parts: [
              {
                inlineData: {
                  data: base64Data,
                  mimeType: mimeType,
                },
              },
              {
                text: prompt,
              },
            ],
          },
          config: hasSelectedKey ? {
            imageConfig: {
              aspectRatio: "1:1",
              imageSize: "1K"
            }
          } : undefined
        });

        let foundImage = false;
        const candidates = response.candidates || [];
        if (candidates.length > 0 && candidates[0].content?.parts) {
          for (const part of candidates[0].content.parts) {
            if (part.inlineData) {
              const base64EncodeString = part.inlineData.data;
              setResultImage(`data:image/png;base64,${base64EncodeString}`);
              foundImage = true;
              break;
            }
          }
        }

        if (!foundImage) {
          // Check if there's a text response explaining why (e.g. safety)
          const textResponse = candidates[0]?.content?.parts?.find(p => p.text)?.text;
          setError(textResponse || "The model didn't return an image. Try a more descriptive prompt.");
          return true; 
        }
        return true;
      } catch (err: any) {
        console.error("Image processing error:", err);
        
        const errorMessage = err?.message || "";
        const errorStatus = err?.status || err?.error?.code || 0;
        
        // Handle "Requested entity was not found" by resetting key state
        if (errorMessage.includes("Requested entity was not found")) {
          setHasSelectedKey(false);
          setError("API session expired or invalid. Please select your API key again.");
          return false;
        }

        const isQuotaError = 
          errorMessage.includes("429") || 
          errorMessage.includes("RESOURCE_EXHAUSTED") ||
          errorStatus === 429 ||
          err?.error?.status === "RESOURCE_EXHAUSTED";

        if (isQuotaError && retryCount < maxRetries) {
          retryCount++;
          const delay = Math.pow(2, retryCount) * 1000;
          setError(`Rate limit hit. Retrying in ${delay/1000}s... (Attempt ${retryCount}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return await callApi();
        }

        if (isQuotaError) {
          setError("API Quota Exceeded. The free tier has strict limits. Please wait a minute or connect a paid API key for higher limits.");
        } else if (errorMessage.includes("safety")) {
          setError("The request was blocked by safety filters. Please try a different prompt.");
        } else {
          setError(`Error: ${errorMessage || "Failed to process image. Please check your connection and try again."}`);
        }
        return false;
      }
    };

    await callApi();
    setIsProcessing(false);
  };

  const reset = () => {
    setImage(null);
    setResultImage(null);
    setPrompt("");
    setError(null);
  };

  return (
    <div className="glass-card rounded-2xl p-2 md:p-3 w-full relative overflow-hidden group/lab">
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent/10 rounded-full blur-[100px] group-hover/lab:bg-accent/20 transition-all duration-1000" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent/10 rounded-full blur-[100px] group-hover/lab:bg-accent/20 transition-all duration-1000" />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 bg-accent/10 rounded-lg text-accent">
          <Wand2 className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-lg font-bold leading-tight">AI Image Lab</h3>
          <p className="text-[9px] opacity-40 font-mono uppercase tracking-wider">
            {hasSelectedKey ? "Gemini 3.1 Flash Image" : "Gemini 2.5 Flash Image"}
          </p>
        </div>
      </div>

      {!hasSelectedKey && (
        <div className="mb-2 p-1.5 rounded-lg bg-accent/5 border border-accent/20 flex flex-col md:flex-row items-center justify-between gap-1.5">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-accent" />
            <p className="text-[9px] opacity-60">
              Free tier. Connect your own API key for 4K resolution.
            </p>
          </div>
          <button 
            onClick={handleSelectKey}
            className="text-[9px] font-bold text-accent hover:underline flex items-center gap-1 whitespace-nowrap"
            aria-label="Connect your Gemini API key"
          >
            Connect API Key <ExternalLink className="w-2.5 h-2.5" />
          </button>
        </div>
      )}

      {hasSelectedKey && (
        <div className="mb-2 p-1.5 rounded-lg bg-emerald-500/5 border border-emerald-500/20 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <p className="text-[9px] opacity-60">
            High Quality mode enabled.
          </p>
          <button 
            onClick={handleSelectKey}
            className="ml-auto text-[9px] font-bold opacity-40 hover:opacity-100 uppercase tracking-widest"
            aria-label="Change your Gemini API key"
          >
            Change Key
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Input Side */}
        <div className="flex flex-col gap-2">
          <div 
            onClick={() => !image && fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (!image) fileInputRef.current?.click();
              }
            }}
            role="button"
            tabIndex={image ? -1 : 0}
            aria-label={image ? "Selected image" : "Upload an image to edit"}
            className={`relative aspect-video rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer overflow-hidden group focus:outline-none focus:ring-2 focus:ring-accent
              ${image ? 'border-accent/50' : 'border-border-theme hover:border-accent/50 bg-card/30'}`}
          >
            {image ? (
              <>
                <img src={image} alt="Original uploaded image for AI editing" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white text-[10px] font-bold bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm">Change Image</p>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); reset(); }}
                  className="absolute top-2 right-2 p-1 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-red-500 transition-colors z-10"
                  aria-label="Remove image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <div className="text-center p-2">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5 text-accent" />
                </div>
                <p className="text-[11px] font-medium opacity-80">Upload Image</p>
                <p className="text-[9px] opacity-40 mt-0.5">PNG, JPG up to 5MB</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*" 
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-0.5">
              <label className="text-[9px] font-mono opacity-40 uppercase tracking-widest font-bold">Edit Prompt</label>
              {(image || prompt) && (
                <button onClick={reset} className="text-[9px] font-bold text-red-500 hover:underline uppercase tracking-widest">Clear All</button>
              )}
            </div>
            <div className="relative group">
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., 'Add a retro filter'..."
                aria-label="AI Edit Prompt"
                className="w-full bg-card/30 border border-border-theme rounded-lg p-2 text-xs focus:border-accent outline-none transition-all resize-none h-14 md:h-16 shadow-inner"
              />
            </div>
          </div>

          <button 
            onClick={processImage}
            disabled={!image || !prompt || isProcessing}
            className="w-full py-2 bg-accent text-white font-bold rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg shadow-accent/20 text-xs"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                Generate Magic
              </>
            )}
          </button>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-2"
            >
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
              <p className="text-[10px] text-red-400 font-mono leading-tight">{error}</p>
            </motion.div>
          )}
        </div>

        {/* Output Side */}
        <div className="flex flex-col gap-2">
          <div className="flex-1 aspect-video rounded-xl bg-card/20 border border-border-theme flex flex-col items-center justify-center overflow-hidden relative shadow-inner">
            <AnimatePresence mode="wait">
              {resultImage ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full h-full"
                >
                  <img 
                    src={resultImage} 
                    alt="AI Generated Result Image" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute bottom-2 right-2 flex gap-1.5">
                    <button 
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = resultImage;
                        link.download = `ai-edit-${Date.now()}.png`;
                        link.click();
                      }}
                      className="p-1.5 bg-black/40 backdrop-blur-md rounded-lg text-white hover:bg-accent transition-colors shadow-lg"
                      aria-label="Download generated image"
                    >
                      <Upload className="w-3.5 h-3.5 rotate-180" />
                    </button>
                  </div>
                </motion.div>
              ) : isProcessing ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center p-4"
                >
                  <div className="relative w-12 h-12 mx-auto mb-2">
                    <div className="absolute inset-0 border-2 border-accent/20 rounded-full" />
                    <div className="absolute inset-0 border-2 border-t-accent rounded-full animate-spin" />
                    <Wand2 className="absolute inset-0 m-auto w-4 h-4 text-accent animate-pulse" />
                  </div>
                  <p className="text-[11px] font-bold text-accent animate-pulse">Synthesizing...</p>
                </motion.div>
              ) : (
                <motion.div 
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center p-4"
                >
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-2 border border-white/10">
                    <ImageIcon className="w-6 h-6 opacity-20" />
                  </div>
                  <p className="text-[11px] font-medium opacity-30">Result will appear here</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="p-2 rounded-xl bg-accent/5 border border-accent/10 flex items-start gap-2">
            <div className="p-1 bg-accent/20 rounded-md shrink-0">
              <ShieldCheck className="w-3 h-3 text-accent" />
            </div>
            <p className="text-[10px] opacity-50 leading-tight">
              <span className="text-accent font-bold">Tip:</span> Use descriptive words like "cinematic" or "cyberpunk".
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
