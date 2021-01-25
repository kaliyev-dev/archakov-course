import React from 'react';
import ProgressiveImage from 'react-progressive-image';

import { formatDistance } from 'date-fns';

import { fetchCommentsByPostId, fetchPostById } from '../api';
import Comment from '../components/Comment';
import Loader from '../components/Loader';
import { useParams } from '../router/hooks';

const PostImagePlaceholder = () => (
  <div
    className="img-fluid col-md-4"
    style={{ height: 210, backgroundColor: '#c9d1d9' }}
  />
);

const PostPage = () => {
  const { id } = useParams();
  const [postIsLoading, setPostIsLoading] = React.useState(false);
  const [commentsIsLoading, setcommentsIsLoading] = React.useState(false);
  const [post, setPost] = React.useState({});
  const [comments, setComments] = React.useState([]);

  const { name, title, image, text, createdAt } = post;

  React.useEffect(() => {
    setPostIsLoading(true);
    setcommentsIsLoading(true);
    fetchPostById(id)
      .then((res) => setPost(res))
      .finally(() => setPostIsLoading(false));
    fetchCommentsByPostId(id)
      .then((res) => setComments(res))
      .finally(() => setcommentsIsLoading(false));
  }, []);

  return (
    <section>
      {postIsLoading ? (
        <Loader />
      ) : (
        <div className="rounded bg-light shadow-sm overflow-hidden">
          <div className="d-flex flex-column flex-md-row">
            <ProgressiveImage placeholder="" src={image}>
              {(src, loading) =>
                loading ? (
                  <PostImagePlaceholder />
                ) : (
                  <img alt={title} className="img-fluid col-md-4" src={src} />
                )
              }
            </ProgressiveImage>
            <div className="d-flex flex-column justify-content-between col p-3">
              <p className="mb-0">{text}</p>
              <div className="border-top text-muted d-flex justify-content-end  mt-3 pt-3">
                <div className="d-inline-flex align-items-center me-5">
                  <i
                    className="bi bi-person-fill d-inline-flex align-items-center me-2"
                    style={{ fontSize: 16 }}
                  />
                  <span>{name}</span>
                </div>
                <div className="d-inline-flex align-items-center pe-2">
                  <i className="bi bi-calendar-event-fill d-inline-flex align-items-center me-2" />
                  <span>
                    {post.createdAt &&
                      formatDistance(Date.parse(createdAt), new Date(), {
                        addSuffix: true,
                      })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4">
        <h5 className="mb-3">
          Комментарии <span className="text-secondary">{comments.length}</span>
        </h5>
        {commentsIsLoading ? (
          <Loader />
        ) : (
          comments.map((comment) => <Comment data={comment} key={comment.id} />)
        )}
      </div>
    </section>
  );
};

export default PostPage;
