type ResumeDownloadButtonProps = {
  pdfPath: string;
  label?: string;
};

export function ResumeDownloadButton({ pdfPath, label = "Download PDF" }: ResumeDownloadButtonProps) {
  return (
    <a
      className="inline-flex items-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      href={pdfPath}
      rel="noreferrer"
      target="_blank"
    >
      {label}
    </a>
  );
}
