import EventEmitter from "events";

const XtraVisionEventEmitter = new EventEmitter();

export default XtraVisionEventEmitter;

/**
 * 1. Send User's body key-points
 *      event name: onUserKeyPoints
 *      event-data: timestamp, keypoints
 *   How to use:
 *              XtraVisionEventEmitter.on('onUserKeyPoints', (data: any) => {console.log('data.toString()');})
 * 
 * 
 */