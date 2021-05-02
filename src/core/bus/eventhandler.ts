'use strict';

import { Dynamic } from '@timcowebapps/common.system';

export interface IEventHandler<EventData> {
	(data: EventData): void;
};
