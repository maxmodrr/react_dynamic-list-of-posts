import React, { useState } from 'react';
import { Post } from '../types/Post';
import cl from 'classnames';

interface Props {
  posts: Post[];
  onActivePost: (v: Post | null) => void;
  onShowSideBar: (v: boolean) => void;
}

export const PostsList: React.FC<Props> = ({
  posts,
  onActivePost,
  onShowSideBar,
}) => {
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [showClose, setShowClose] = useState(false);

  const handleChangeButton = (post: Post) => {
    if (post.id === activePost?.id) {
      setShowClose(!showClose);
      onShowSideBar(showClose ? false : true);

      return;
    }

    onActivePost(post);
    onShowSideBar(true);

    setShowClose(true);
    setActivePost(post);
  };

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={cl('button is-link', {
                    'is-light': activePost?.id !== post.id || !showClose,
                  })}
                  onClick={() => handleChangeButton(post)}
                >
                  {showClose && activePost?.id === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
          {/* <tr data-cy="Post">
          <td data-cy="PostId">17</td>

          <td data-cy="PostTitle">
            fugit voluptas sed molestias voluptatem provident
          </td>
        </tr>

        <tr data-cy="Post">
          <td data-cy="PostId">18</td>

          <td data-cy="PostTitle">
            voluptate et itaque vero tempora molestiae
          </td>

          <td className="has-text-right is-vcentered">
            <button
              type="button"
              data-cy="PostButton"
              className="button is-link"
            >
              Close
            </button>
          </td>
        </tr>

        <tr data-cy="Post">
          <td data-cy="PostId">19</td>
          <td data-cy="PostTitle">adipisci placeat illum aut reiciendis qui</td>

          <td className="has-text-right is-vcentered">
            <button
              type="button"
              data-cy="PostButton"
              className="button is-link is-light"
            >
              Open
            </button>
          </td>
        </tr>

        <tr data-cy="Post">
          <td data-cy="PostId">20</td>
          <td data-cy="PostTitle">doloribus ad provident suscipit at</td>

          <td className="has-text-right is-vcentered">
            <button
              type="button"
              data-cy="PostButton"
              className="button is-link is-light"
            >
              Open
            </button>
          </td>
        </tr> */}
        </tbody>
      </table>
    </div>
  );
};
