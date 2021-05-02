'use strict';

import { Dynamic } from '@timcowebapps/common.system';
import { IEventHandler } from './eventhandler';
import { IEventMetadata } from './eventmetadata';

// export interface IEventHandler<EventData, Response> {
// 	(data: EventData): Promise<Response>;
// };

// export interface IPubSubRegistry<Response = any> {
// 	//publish: (eventname: string, data: any) => void;
// 	//subscribe<T extends any>(eventname: string, fn: IEventHandler<T, Response>)/*: () => void*/;
// };

export interface IDatabusService {
	publish: (eventname: string, data: Dynamic.IAnyObject) => void;
	subscribe<T extends Dynamic.IAnyObject>(eventname: string, metadata: IEventMetadata, handler: IEventHandler<T>): void;
	unsubscribe: (eventname: string, metadata: IEventMetadata) => void;
};
