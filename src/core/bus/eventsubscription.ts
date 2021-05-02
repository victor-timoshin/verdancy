'use strict';

import { Dynamic } from '@timcowebapps/common.system';
import { IEventMetadata } from './eventmetadata';
import { IEventHandler } from './eventhandler';

export interface IEventSubscription {
	metadata: IEventMetadata;
	handler: IEventHandler<Dynamic.IAnyObject>;
};
