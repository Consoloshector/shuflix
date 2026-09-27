import { useState, useEffect } from 'react';
import { auth, googleProvider, signInWithPopup, signOut } from './firebase';
import { db } from './firebase';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import blueTik from './components/imgs/blue_tic.png';

export default function CommentSection({ mediaId }) {
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState(null);
  const [nickName, setnickName] = useState('');
  const [isEditingName, setisEditingName] = useState(false);

  useEffect(() => {
    if (!mediaId) return;

    const q = query(
      collection(db, 'media', String(mediaId), 'comments'),
      orderBy('createdAt', 'desc')
    );

    const unsubscriber = onSnapshot(q, (snapshot) => {
      const fetchedComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setComment(fetchedComments);
    });

    return () => unsubscriber();
  }, [mediaId]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userInfo) => {
      setUser(userInfo);

      if (userInfo) {
        setnickName(userInfo.displayName || "İstifadəçi");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Giriş xətası:", error);
    }
  };

  const handleSavingName = () => {
    if (nickName.trim()) {
      setisEditingName(false);
    }
  };

  const handleLogOut = () => {
    signOut(auth);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim() || !user) return;

    try {
      await addDoc(collection(db, 'media', String(mediaId), 'comments'), {
        author: nickName || user.displayName,
        authorPhoto: user.photoURL,
        userId: user.uid,
        text: newComment,
        createdAt: new Date().toLocaleDateString('az-AZ')
      });
      setNewComment('');
    } catch (error) {
      console.error("Xəta baş verdi:", error);
    }
  };

  return (
    <div className='flex flex-col'>
      {user ? (
        <form onSubmit={handleSubmit} className='flex flex-col max-w-5xl bg-zinc-800 text-white p-3 gap-2 rounded-xl'>
          <h3>Rəylər</h3>
          <div className='flex w-full justify-between items-center'>
            {isEditingName ? (
              <div className='flex items-center gap-1'>
                <input 
                  type="text" 
                  value={nickName} 
                  onChange={(e) => setnickName(e.target.value)}
                  className='bg-zinc-900 border border-zinc-600 text-xs text-white p-1 rounded focus:outline-none'
                />
                <button 
                  type="button" 
                  onClick={handleSavingName} 
                  className='text-xs bg-green-600 px-2 py-1 rounded'
                >
                  Saxla
                </button>
              </div>
            ) : (
              <div className='flex items-center gap-1.5'>
                <span className='text-sm font-semibold'>{nickName}</span>
                <button 
                  type="button" 
                  onClick={() => setisEditingName(true)} 
                  className='text-[10px] text-zinc-400 hover:text-red-400 underline'
                >
                  (dəyiş)
                </button>
              </div>
            )}
            <div>
              <button 
                type="button" 
                onClick={handleLogOut} 
                className='text-xs text-zinc-400 hover:text-red-400 underline'
              >
                Çıxış Et
              </button>
            </div>
          </div>
          <textarea 
            className='p-2 bg-zinc-900 border border-zinc-700 rounded text-sm focus:outline-none' 
            value={newComment} 
            onChange={(e) => setNewComment(e.target.value)} 
            placeholder="Rəyinizi yazın..." 
            rows={3}
          ></textarea>
          <button type="submit" className='bg-red-600 hover:bg-red-700 transition p-2 rounded text-sm font-semibold'>
            Rəy Bildir
          </button>
        </form>
      ) : (
        <div className='flex flex-col max-w-5xl bg-zinc-900 text-white p-3 gap-2 rounded-xl'>
          <button
          type="button"
          onClick={handleGoogleLogin}
          className='bg-red-600 hover:bg-red-700 transition px-4 py-2 text-sm font-semibold rounded'
        >
          Google ilə Giriş Et
        </button>
        </div>
      )}

      <div className='max-h-[300px] overflow-auto scrollbar-none text-white mt-3'>
        {comment.length === 0 ? (
          <p className='text-zinc-400 text-sm'>Hələ ki rəy yoxdur. İlk rəyi siz yazın!</p>
        ) : (
          comment.map((item) => (
            <div key={item.id} className='max-w-5xl bg-zinc-900 flex p-2.5 rounded-xl gap-2.5 mt-2'>
              {item.authorPhoto ? (
                <img src={item.authorPhoto} alt={item.author} className='w-7 h-7 rounded-full shrink-0 object-cover' />
              ) : (
                <div className='bg-red-600/40 text-red-300 w-7 h-7 flex items-center justify-center rounded-full shrink-0 capitalize text-xs font-bold'>
                  {item?.author?.charAt(0)}
                </div>
              )}
              
              <div className='flex flex-col gap-1 w-full min-w-0'>
                <div className='flex justify-between items-center w-full'>
                  <div className='flex items-center gap-1'>
                    <strong className='text-sm capitalize'>{item.author}</strong>
                    {item.author?.includes("🗡") && (
                      <img className='w-4 h-4 inline-block' src={blueTik} alt="verified" />
                    )}
                  </div>
                  <p className='text-[10px] text-zinc-400'>{item.createdAt}</p>
                </div>
                <p className='text-xs font-light break-words text-zinc-200'>{item.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}