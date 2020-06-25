import fs from 'fs';
import { spawn, exec } from 'child_process';
import {
  DIR_LOUD_GAMEDATA,
  DOC_DIR_SUPCOM_MAPS,
  DOC_DIR_SUPCOM_MODS,
  DOC_DIR_SUPCOM_REPLAYS,
  FILE_URI_LOG,
  FILE_URI_INFO,
  FILE_URI_GAMELOG,
  FILE_URI_HELP,
  FILE_URI_LOUDDATAPATHLUA,
  FILE_URI_ICONMOD,
} from '../constants';
import { from } from 'rxjs';
import { logEntry } from './logger';

export type Target =
  | 'datapathlua'
  | 'maps'
  | 'mods'
  | 'replays'
  | 'log'
  | 'gamelog'
  | 'help'
  | 'info'
  | 'loud'
  | 'iconmod';

const targetPath = (target: Target) => {
  switch (target) {
    case 'maps':
      return `C:/Windows/explorer.exe`;

    case 'mods':
      return `C:/Windows/explorer.exe`;

    case 'replays':
      return `C:/Windows/explorer.exe`;

    case 'log':
      return `notepad.exe`;

    case 'gamelog':
      return `notepad.exe`;

    case 'help':
      return `notepad.exe`;

    case 'info':
      return `notepad.exe`;
    case 'iconmod':
      return `C:/Windows/explorer.exe`;
    default:
      throw new Error('invalid target');
  }
};

export const targetURI = (target: Target) => {
  switch (target) {
    case 'datapathlua':
      return FILE_URI_LOUDDATAPATHLUA;
    case 'maps':
      return DOC_DIR_SUPCOM_MAPS;
    case 'mods':
      return DOC_DIR_SUPCOM_MODS;
    case 'replays':
      return DOC_DIR_SUPCOM_REPLAYS;
    case 'log':
      return FILE_URI_LOG;
    case 'gamelog':
      return FILE_URI_GAMELOG;
    case 'help':
      return FILE_URI_HELP;
    case 'info':
      return FILE_URI_INFO;
    case 'loud':
      return DIR_LOUD_GAMEDATA;
    case 'iconmod':
      return FILE_URI_ICONMOD;
    default:
      throw new Error('invalid target');
  }
};

export const openTargetCheck = (target: Target) =>
  from(
    new Promise<boolean>((res) => {
      fs.stat(targetURI(target), (err) => {
        if (err) {
          res(false);
          return;
        }
        res(true);
      });
    })
  );

const openTarget = (target: Target) => {
  let path = targetPath(target);
  let targetArgs: string[] = [targetURI(target)];
  if (!targetPath.length) {
    return;
  }
  if (path === FILE_URI_ICONMOD) {
    exec(`${FILE_URI_ICONMOD}`, (err) => {
      if (err) {
        logEntry(`${err}`, 'error');
      }
    });
  } else {
    spawn(path, targetArgs);
  }
};

export default openTarget;