import { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import blueTik from './components/imgs/blue_tic.png';

export default function CommentSection({ mediaId }) {

  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');

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
      setComment(fetchedComments)
    })

    return () => unsubscriber();

  }, [mediaId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim() || !userName.trim()) return;

    try {
      await addDoc(collection(db, 'media', String(mediaId), 'comments'), {
        author: userName,
        text: newComment,
        createdAt: new Date().toLocaleDateString('az-AZ')
      })
      setNewComment('');
    }
    catch (error) {
      console.error("Xeta bas verdi:", error);
    }
  }

  return (
    <div className='flex flex-col'>
      <form onSubmit={handleSubmit} className='flex flex-col max-w-5xl bg-zinc-800 text-white p-3 gap-2'>
        <h3>Rəylər</h3>
        <input type="text" className='border-b-2 border-zinc-700 p-1' value={userName} placeholder="Adınız..." onChange={(e) => setUserName(e.target.value)} />
        <textarea className='p-1' name="" id="" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Rəyinizi yazın..." rows={3}></textarea>
        <button type="submit" className='bg-red-600 p-2'>
          Rəy Bildir
        </button>
        <div className='max-h-[250px] overflow-auto scrollbar-none'>
          {comment.length === 0 ? (<p className='text-white'>Hələ ki rəy yoxdur. İlk rəyi siz yazın!</p>) : (
            comment.map((item) => (
              <div key={item.id} className='max-w-5xl bg-zinc-900 flex p-2 rounded-xl gap-2 mt-2'>
                 <div className='bg-red-600/40 text-red-300 min-w-7 max-h-7 flex items-center justify-center rounded-full shrink-0 capitalize'>{item?.author?.charAt(0)}</div>
                 <div className='flex flex-col gap-2 mt-1.5 w-full min-w-0'>
                  <div className='flex justify-between items-center w-full'>
                  <div>
                    <strong className='text-sm capitalize'>{item.author}</strong>
                    {
                      item.author?.includes("🗡")&&<img className='w-4 h-4 inline-block ml-1' src={blueTik} alt="" />
                    }
                  </div>
                  <p className='text-xs'>20.09.2026</p>
                </div>
                <p className='text-xs font-light break-words'>{item.text}</p>
                 </div>
              </div>
            ))
          )}
        </div>
      </form>
    </div>
  )
}