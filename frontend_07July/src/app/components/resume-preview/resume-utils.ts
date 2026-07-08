export const resumeUrl = '/assets/Eakas_Arora_Resume.pdf';

export function triggerResumeDownload(url = resumeUrl) {
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Eakas_Arora_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
