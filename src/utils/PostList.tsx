// import React, { useRef } from 'react';
// import { FixedSizeList as List } from 'react-window';

// interface Post {
//   _id: string;
//   reShared?: boolean;
//   reShare?: Array<any>;
//   owner: {
//     _id: string;
//     profilePhoto?: {
//       url: string;
//     };
//     fullname: string;
//     handle: string;
//   };
//   createdAt: string;
//   content: string;
//   photos?: Array<{ url: string }>;
// }

// interface Props {
//   posts: Post[];
//   mode: string;
//   desktopMenu: boolean;
//   menu: boolean;
//   me: string;
//   viewAProfile: (id: string) => void;
//   cancelReshared: (id: string) => void;
//   viewUserProfile: (id: string) => void;
//   goToPost: (id: string) => void;
//   menuShow: (id: string) => void;
//   desktopMenuRef: React.RefObject<HTMLDivElement>;
//   postClicked: string;
//   handleEditPost: (id: string) => void;
//   handleDeletePost: (id: string) => void;
//   getUser: any;
//   handleFollowing: (id: string) => void;
//   handleLike: (id: string) => void;
//   handleReShare: (id: string) => void;
//   handleBookmark: (id: string) => void;
//   isCommenting: boolean;
//   handleCommentSubmit: (id: string) => void;
//   formatCreatedAt: (date: string) => string;
// }

// const PostList: React.FC<Props> = ({
//   posts,
//   mode,
//   desktopMenu,
//   menu,
//   me,
//   viewAProfile,
//   cancelReshared,
//   viewUserProfile,
//   goToPost,
//   menuShow,
//   desktopMenuRef,
//   postClicked,
//   handleEditPost,
//   handleDeletePost,
//   getUser,
//   handleFollowing,
//   handleLike,
//   handleReShare,
//   handleBookmark,
//   isCommenting,
//   handleCommentSubmit,
//   formatCreatedAt,
// }) => {
//   const renderRow = ({ index, style }: { index: number; style: React.CSSProperties }) => {
//     const post = posts[index];

//     return (
//       <div key={post._id} style={style} className={`rounded-full py-1 p-3 max-w-full ${mode === 'light' ? `${desktopMenu || menu ? 'bg-gray-200' : 'bg-white'} text-black fill-black` : 'bg-black text-white fill-white'} border border-gray-200 border-opacity-40 rounded-lg`}>
//         {post.reShared && (
//           <div className={`flex justify-between px-2 items-center border-b border-b-gray-300 border-opacity-40`}>
//             <div className="flex items-center pb-4">
//               <img onClick={() => viewAProfile(post.reShare[0]?.user?._id)} className="w-8 h-8 rounded-full cursor-pointer" src={post.reShare[0]?.user?.profilePhoto?.url} alt="" />
//               <p className="text-xs font-medium px-1">{post.reShare[0]?.user?.fullname}</p>
//               <p className="text-gray-500 text-xs font-semibold px-3">Reshared this post</p>
//             </div>
//             {post.reShare[0]?.user?._id === me && <UndoLogo onClick={() => cancelReshared(post._id)} className="w-3 h-3 cursor-pointer" />}
//           </div>
//         )}
//         <div className="flex items-center gap-2 w-full">
//           <img onClick={() => viewUserProfile(post.owner._id)} className="w-8 h-8 rounded-full cursor-pointer" src={post.owner.profilePhoto?.url} alt='' />
//           <div className="w-full cursor-pointer flex items-center justify-between gap-1">
//             <div onClick={() => goToPost(post._id)} className="flex items-center">
//               <div className="mt-3">
//                 <h1 className="text-sm font-semibold">{post.owner.fullname}</h1>
//                 <p className="text-gray-400 text-[8px]">{formatCreatedAt(post.createdAt)}</p>
//               </div>
//               <VerifyMarkLogo className="w-5 h-5 fill-purple-500" />
//               <p className="text-gray-400 text-[10px]">@{post.owner.handle}</p>
//             </div>
//             <div onClick={() => menuShow(post._id)} className="cursor-pointer ">
//               <div className="relative">
//                 <MenuLogo className="w-[12px] h-[12px]" />
//                 <div
//                   ref={desktopMenuRef}
//                   id="desktopmenu"
//                   className={`hidden ${desktopMenu && post._id === postClicked ? "sm:block" : "sm:hidden"} absolute shadow-xl shadow-purple-80 z-10 top-0 -right-[10px] w-[150px] ${mode === 'light' ? 'bg-white fill-black stroke-black text-black' : 'bg-gray-900 fill-white stroke-white text-white'} h-auto rounded-3xl mx-auto  p-2`}
//                 >
//                   {getUser?._doc?._id === post.owner._id ? (
//                     <>
//                       <div onClick={() => handleEditPost(post._id)} className="flex gap-2 px-2 cursor-pointer items-center pt-4">
//                         <EditLogo className="w-3 h-3" />
//                         <p className="text-[10px]">Edit Post</p>
//                       </div>
//                       <div onClick={() => handleDeletePost(post._id)} className="flex gap-2 cursor-pointer items-center pt-4">
//                         <TrashLogo className="w-5 h-5" />
//                         <p className="text-[10px]">Delete Post</p>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       {getUser?._doc?.following?.includes(post.owner._id) && (
//                         <div onClick={() => handleFollowing(post.owner._id)} className="flex gap-2 cursor-pointer items-center pt-4">
//                           <AddContactLogo className="w-3 h-3" />
//                           <p className="text-[10px]">Follow @{post.owner.handle}</p>
//                         </div>
//                       )}
//                       <div className="flex gap-2 items-center pt-4  cursor-pointer">
//                         <BlockContactLogo className="w-3 h-3" />
//                         <p className="text-[10px]">Block @{post.owner.handle}</p>
//                       </div>
//                       <div className="flex gap-2 items-center cursor-pointer pt-4">
//                         <ReportContactLogo className="w-3 h-3" />
//                         <p className="text-[10px]">Report Post</p>
//                       </div>
//                       <div className="flex gap-2 cursor-pointer items-center pt-4">
//                         <MuteContactLogo className="w-3 h-3" />
//                         <p className="text-[10px]">Mute @{post.owner.handle}</p>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div onClick={() => goToPost(post._id)} className="ml-9">
//           <p className="text-[11px] text-gray-400">
//             {post.content.length > 200 ? (
//               <>
//                 <p className="text-justify text-wrap text-[11px] text-gray-600">
//                   {post.content.slice(0, 500)} <strong className="cursor-pointer text-purple-600 text-xs">read more</strong>
//                 </p>
//               </>
//             ) : (
//               post.content
//             )}
//           </p>
//         </div>
//         {/* Render additional content like photos, video modal, etc. here */}
//       </div>
//     );
//   };

//   return (
//     <List
//       height={600} // Adjust height as needed
//       itemCount={posts.length}
//       itemSize={150} // Adjust item size as needed
//       width={'100%'}
//     >
//       {renderRow}
//     </List>
//   );
// };

// export default PostList;
