// // src/components/VideoUpload.tsx
// import React, { useRef, useState } from 'react';
// import axios from 'axios';

// const VideoUpload: React.FC = () => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [trimmedBlob, setTrimmedBlob] = useState<Blob | null>(null);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0] || null;
//     setSelectedFile(file);
//     if (file && videoRef.current) {
//       videoRef.current.src = URL.createObjectURL(file);
//     }
//   };

//   const handleTrim = () => {
//     if (videoRef.current && selectedFile) {
//       const video = videoRef.current;
//       video.currentTime = 0;

//       video.onloadedmetadata = () => {
//         if (video.duration > 30) {
//           const duration = 30;
//           const canvas = document.createElement('canvas');
//           const ctx = canvas.getContext('2d');
//           const { videoWidth, videoHeight } = video;

//           canvas.width = videoWidth;
//           canvas.height = videoHeight;

//           let blobs: BlobPart[] = [];
//           let chunks = Math.ceil(video.duration / duration);

//           const captureFrame = (currentTime: number) => {
//             return new Promise((resolve) => {
//               video.currentTime = currentTime;
//               video.onseeked = () => {
//                 if (ctx) {
//                   ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
//                   canvas.toBlob((blob) => {
//                     if (blob) blobs.push(blob);
//                     resolve(true);
//                   }, 'video/mp4');
//                 }
//               };
//             });
//           };

//           const processChunks = async () => {
//             for (let i = 0; i < chunks; i++) {
//               await captureFrame(i * duration);
//             }

//             const finalBlob = new Blob(blobs, { type: 'video/mp4' });
//             setTrimmedBlob(finalBlob);
//           };

//           processChunks();
//         }
//       };
//     }
//   };

//   const handleUpload = async () => {
//     if (trimmedBlob) {
//       const formData = new FormData();
//       formData.append('file', trimmedBlob, 'trimmed-video.mp4');

//       try {
//         const response = await axios.post('YOUR_UPLOAD_ENDPOINT', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         console.log('Upload successful:', response.data);
//       } catch (error) {
//         console.error('Error uploading video:', error);
//       }
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept="video/*" onChange={handleFileChange} />
//       <video ref={videoRef} controls style={{ display: 'none' }} />
//       <button onClick={handleTrim}>Trim Video</button>
//       <button onClick={handleUpload} disabled={!trimmedBlob}>Upload Video</button>
//     </div>
//   );
// };

// export default VideoUpload;
export {}