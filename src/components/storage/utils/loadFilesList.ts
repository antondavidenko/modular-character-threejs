import * as $ from 'jquery';

const CONFIG = "cdn_config.json";
export let CDN_ROOT = '';

export function loadList(cdnRoot: string, callback: (data: any) => void): void {
    CDN_ROOT = cdnRoot;
    $.getJSON(`${cdnRoot}${CONFIG}`, (data: any) => {
        callback(data);
    });
}