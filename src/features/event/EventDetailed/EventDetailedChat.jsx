import React, { Fragment, useState } from 'react';
import { Segment, Header, Comment } from 'semantic-ui-react';
import EventDetailedChatForm from './EventDetailedChatForm';
import formatDistance from 'date-fns/formatDistance';
import { Link } from 'react-router-dom';

function EventDetailedChat({ eventChat, eventId }) {
  const [showFormReply, setShowFormReply] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  const handleShowFormReply = id => {
    setShowFormReply(true);
    setSelectedCommentId(id);
  };
  const handleCloseFormReply = () => {
    setShowFormReply(false);
    setSelectedCommentId(null);
  };
  return (
    <Fragment>
      <Segment
        textAlign='center'
        attached='top'
        inverted
        color='teal'
        style={{ border: 'none' }}
      >
        <Header>Chat about this event</Header>
      </Segment>

      <Segment attached>
        <Comment.Group>
          {eventChat &&
            eventChat.map(
              ({
                key,
                id,
                value: { photoURL, displayName, date, text, uid },
                children,
              }) => (
                <Comment key={key}>
                  <Comment.Avatar src={photoURL} />
                  <Comment.Content>
                    <Comment.Author as={Link} to={`/profile/${uid}`}>
                      {displayName}
                    </Comment.Author>
                    <Comment.Metadata>
                      {date && <div>{formatDistance(date, Date.now())}</div>}
                    </Comment.Metadata>
                    <Comment.Text>{text}</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action onClick={() => handleShowFormReply(id)}>
                        Reply
                      </Comment.Action>

                      {showFormReply && selectedCommentId === id && (
                        <EventDetailedChatForm
                          eventId={eventId}
                          parentId={key}
                          form={`reply_${key}`}
                          closeForm={handleCloseFormReply}
                        />
                      )}
                    </Comment.Actions>
                  </Comment.Content>

                  <Comment.Group>
                    {children &&
                      children.map(child => (
                        <Comment key={child.key}>
                          <Comment.Avatar src={child.value.photoURL} />
                          <Comment.Content>
                            <Comment.Author
                              as={Link}
                              to={`/profile/${child.value.uid}`}
                            >
                              {child.value.displayName}
                            </Comment.Author>
                            <Comment.Metadata>
                              {child.value.date && (
                                <div>
                                  {formatDistance(child.value.date, Date.now())}
                                </div>
                              )}
                            </Comment.Metadata>
                            <Comment.Text>{child.value.text}</Comment.Text>
                            <Comment.Actions>
                              <Comment.Action
                                onClick={() => handleShowFormReply(child.id)}
                              >
                                Reply
                              </Comment.Action>

                              {showFormReply &&
                                selectedCommentId === child.id && (
                                  <EventDetailedChatForm
                                    eventId={eventId}
                                    parentId={child.parentId}
                                    form={`reply_${child.key}`}
                                    closeForm={handleCloseFormReply}
                                  />
                                )}
                            </Comment.Actions>
                          </Comment.Content>
                        </Comment>
                      ))}
                  </Comment.Group>
                </Comment>
              )
            )}
        </Comment.Group>
        <EventDetailedChatForm
          eventId={eventId}
          parentId={0}
          form='newComment'
          closeForm={handleCloseFormReply}
        />
      </Segment>
    </Fragment>
  );
}

export default EventDetailedChat;
