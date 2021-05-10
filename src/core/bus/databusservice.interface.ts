'use strict';

import { Dynamic } from '@timcowebapps/common.system';
import { IEventHandler } from './eventhandler';
import { IEventMetadata } from './eventmetadata';

export interface IDatabusService {
	publish: (eventname: string, data: Dynamic.IAnyObject) => void;
	subscribe<T extends Dynamic.IAnyObject>(eventname: string, metadata: IEventMetadata, handler: IEventHandler<T>): void;
	unsubscribe: (eventname: string, metadata: IEventMetadata) => void;
};
