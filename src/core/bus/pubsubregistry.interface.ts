'use strict';

export interface IPubSubRegistry {
	publish: (eventname: string, data: any)=> void;
	subscribe: (eventname: string, fn: (data: any) => void) => void;
};
