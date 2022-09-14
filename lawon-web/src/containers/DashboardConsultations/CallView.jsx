import React, { useState } from 'react';
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';
import '@opentok/client';
import { Button, ButtonGroup } from '@material-ui/core';
import { CallEnd, Videocam, Mic, VideocamOff, MicOff, List } from '@material-ui/icons';
import Alert from "@material-ui/lab/Alert";

import { TOKBOX_API_KEY } from '../../common/constants';

export default ({ call, onOpenDtails }) => {
  const { token, sessionId, error: serverError, loading } = call || {};

  const [error, setError] = useState(null);
  const [connection, setConnection] = useState('Connecting');
  const [publishVideo, setPublishVideo] = useState(true);
  const [publishAudio, setPublishAudio] = useState(true);


  const sessionEventHandlers = {
    sessionConnected: () => {
      setConnection('Connected');
    },
    sessionDisconnected: () => {
      setConnection('Disconnected');
    },
    sessionReconnected: () => {
      setConnection('Reconnected');
    },
    sessionReconnecting: () => {
      setConnection('Reconnecting');
    }
  };

  const publisherEventHandlers = {
    accessDenied: () => {
      console.log('User denied access to media source');
    },
    streamCreated: () => {
      console.log('Publisher stream created');
    },
    streamDestroyed: ({ reason }) => {
      console.log(`Publisher stream destroyed because: ${reason}`);
    },
  };

  const subscriberEventHandlers = {
    videoEnabled: () => {
      console.log('Subscriber video enabled');
    },
    videoDisabled: () => {
      console.log('Subscriber video disabled');
    },
  };

  const onSessionError = error => {
    console.log('.onSessionError.................', error)
  };

  const onPublish = () => {
    console.log('Publish Success');
  };

  const onPublishError = error => {
    // setError(error);
    console.log('onPublishError........', error)
  };

  const onSubscribe = (event) => {
    console.log('Subscribe Success', event);
  };

  const onSubscribeError = error => {
    // setError(error);
  };

  const toggleVideo = () => {
    setPublishVideo((publishVideo) => !publishVideo);
  };

  const toggleAudio = () => {
    setPublishAudio((publishAudio) => !publishAudio);
  };

  return (
    <div className='video-call-view' >
      <div className='incoming'>
        {
          (!token || !sessionId)
          && (
            <div style={{ width: '100%', height: 'calc(100vh - 124px)' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
              }}>
                {serverError && (
                  <Alert style={{ fontSize: "16px" }} severity="error">
                    {serverError}
                  </Alert>
                )}
                {!serverError && 'Connecting...'}
              </div>
            </div>
          )
        }
        {
          (token && sessionId)
          && (
            <OTSession
              apiKey={TOKBOX_API_KEY}
              sessionId={sessionId}
              token={token}
              onError={onSessionError}
              //eventHandlers={sessionEventHandlers}
              eventHandlers={{
              }}>
              <OTPublisher
                properties={{
                  publishVideo,
                  publishAudio,
                  width: '100%',
                  height: 'calc(100vh - 124px)',
                }}
                onPublish={onPublish}
                onError={onPublishError}
                eventHandlers={publisherEventHandlers}
              />
              <div
                style={{
                  position: 'absolute',
                  zIndex: 10,
                  top: '77px'
                }}>
                <OTStreams>
                  <OTSubscriber
                    properties={{
                      width: '100',
                      height: '100',
                    }}
                    onSubscribe={onSubscribe}
                    onError={onSubscribeError}
                    eventHandlers={subscriberEventHandlers}
                  />
                </OTStreams>
              </div>
            </OTSession>
          )
        }
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <ButtonGroup aria-label="small outlined button group">
            <Button
              disabled={serverError || loading}
              color='primary'
              variant="contained"
              onClick={toggleAudio}>
              {publishAudio ? <Mic /> : <MicOff />}
            </Button>
            <Button
              disabled={serverError || loading}
              color='primary'
              variant='contained'
              onClick={toggleVideo}>
              {publishVideo ? <Videocam /> : <VideocamOff />}
            </Button>
            <Button
              disabled={serverError || loading}
              color='secondary'
              variant='contained'>
              <CallEnd />
            </Button>
            <Button
              onClick={onOpenDtails}
              variant='contained'>
              <List />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}
