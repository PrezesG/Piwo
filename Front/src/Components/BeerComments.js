import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBeerComment, postBeerComment, deleteBeerComment, updateBeerComment } from './api'; // Import the function you created to fetch and post comments
import TextareaAutosize from 'react-textarea-autosize';

const BeerComments = () => {
    const { beerId } = useParams();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null); // Add this line


    useEffect(() => {
        getBeerComment(beerId)
            .then(setComments)
            .catch(console.error);


    }, [beerId]);

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        if (editingCommentId) {
            await updateBeerComment(beerId, editingCommentId, newComment); // Update the comment if editingCommentId is set
            setEditingCommentId(null); // Reset editingCommentId after updating the comment
        } else {
            await postBeerComment(beerId, newComment); // Post a new comment if editingCommentId is not set
        }
        setNewComment('');
        // Refresh comments
        getBeerComment(beerId)
            .then(setComments)
            .catch(console.error);
    };
    const handleEditComment = (comment) => {
        setNewComment(comment.comment);
        setEditingCommentId(comment.commentId); // Set editingCommentId when the edit button is clicked
    };

    const handleDeleteComment = async (commentId) => {
        if (commentId) {
            await deleteBeerComment(beerId, commentId);
            getBeerComment(beerId)
                .then(setComments)
                .catch(console.error);
        } else {
            console.error('Comment ID is undefined');
        }
    };

    return (
        <div className="comments h-256 no-scrollbar">
            <div className="p-20 w-full flex flex-wrap ">
                {comments.map((comment, index) => (
                    <div key={index} className="bg-white overflow-hidden shadow rounded-lg border h-64 w-96 m-2">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                            </h3>
                            <div className="mt-1 max-w-2xl text-sm text-gray-500 flex justify-between">
                                <p>Posted on {new Date(comment.dateAdded).toLocaleDateString()}</p>
                                <div className="flex space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
                                         onClick={() => handleEditComment(comment)}>
                                        <g fill="none" stroke="currentColor" stroke-linecap="round"
                                           stroke-linejoin="round"
                                           stroke-width="2">
                                            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                            <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1l1-4Z"/>
                                        </g>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
                                         onClick={() => handleDeleteComment(comment.commentId)}>
                                        <path fill="currentColor"
                                              d="M7.616 20q-.691 0-1.153-.462T6 18.384V6H5V5h4v-.77h6V5h4v1h-1v12.385q0 .69-.462 1.153T16.384 20zm2.192-3h1V8h-1zm3.384 0h1V8h-1z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                            <dl className="sm:divide-y sm:divide-gray-200">
                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">{comment.userName} said:</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 overflow-auto no-scrollbar"
                                        style={{maxHeight: '100px'}}>
                                        {comment.comment}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                ))}
                <form onSubmit={handleCommentSubmit}
                      style={{position: 'fixed', bottom: '0', right: '0', width: '70%',}}>
                    <div className="mb-5 p-20 w-192 bo">
                        <TextareaAutosize id="large-input" value={newComment}
                                          onChange={(e) => setNewComment(e.target.value)} required
                                          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                        <button type="submit">{editingCommentId ? 'Edit Comment' : 'Add Comment'}</button>
                        {/* Change the button text based on whether a comment is being edited or not */}
                    </div>
                </form>
            </div>
        </div>
    )
        ;
};

export default BeerComments;