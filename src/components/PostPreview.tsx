import { motion } from "framer-motion";
import { Copy, CheckCircle2, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface PostPreviewProps {
  content: string;
}

export function PostPreview({ content }: PostPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card-strong rounded-2xl overflow-hidden"
    >
      {/* LinkedIn-style header */}
      <div className="p-5 border-b border-border">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <User className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground">Your Name</h4>
            <p className="text-sm text-muted-foreground">Your Headline</p>
            <p className="text-xs text-muted-foreground mt-0.5">Just now • 🌐</p>
          </div>
        </div>
      </div>

      {/* Post content */}
      <div className="p-5">
        <p className="text-foreground leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      </div>

      {/* Actions */}
      <div className="px-5 pb-5">
        <Button
          variant="outline"
          onClick={handleCopy}
          className="w-full group"
        >
          {copied ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span className="text-success">Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Copy to Clipboard</span>
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
