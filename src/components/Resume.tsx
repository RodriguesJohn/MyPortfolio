import { Download, FileText } from "lucide-react";
import { motion } from "framer-motion";
import resumePdf from "@/assets/JohnRodriguesResume.pdf";

export function Resume() {
  return (
    <section className="py-8 sm:py-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-medium mb-2">Resume</h2>
            <p className="text-muted-foreground">Sr. Product Designer & Design Engineer</p>
          </div>
          <motion.a
            href={resumePdf}
            download="John_Rodrigues_Resume.pdf"
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white"
            style={{
              background: 'linear-gradient(180deg, #3a3a3a 0%, #1a1a1a 100%)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)'
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Download className="h-4 w-4" />
            Download Resume
          </motion.a>
        </div>

        {/* PDF Preview */}
        <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 overflow-hidden shadow-sm">
          <div className="bg-gray-100 dark:bg-gray-800/50 px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/50 flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">John_Rodrigues_Resume.pdf</span>
          </div>
          <div className="aspect-[8.5/11] w-full">
            <iframe
              src={`${resumePdf}#toolbar=0&navpanes=0&scrollbar=0`}
              className="w-full h-full border-0"
              title="Resume Preview"
            />
          </div>
        </div>

        {/* Fallback message */}
        <p className="text-center text-sm text-muted-foreground mt-4">
          Can't see the preview?{" "}
          <a
            href={resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            Open in new tab
          </a>
        </p>
      </div>
    </section>
  );
}
