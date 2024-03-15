/**
 * @desc 封装了localStorage和sessionStorage的使用, 可直接保存, 获取对象.
 */
export function setSession(name: string, value: any) {
  if (typeof sessionStorage === 'object') {
    let data = value;
    if (typeof value !== 'string') {
      if (data === undefined) {
        data = null;
      } else {
        data = JSON.stringify(data);
      }
    }
    sessionStorage.setItem(name, data);
  }
}

export function getSession(name: string) {
  if (typeof sessionStorage === 'object') {
    const data = sessionStorage.getItem(name);
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }
  return null;
}

export function setLocal(name: string, value: any) {
  if (typeof localStorage === 'object') {
    let data = value;
    if (typeof value !== 'string') {
      if (data === undefined) {
        data = null;
      } else {
        data = JSON.stringify(data);
      }
    }
    localStorage.setItem(name, data);
  }
}

export function getLocal(name: string) {
  if (typeof localStorage === 'object') {
    const data = localStorage.getItem(name);
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }
  return null;
}
export function removeSession(name: string) {
  if (sessionStorage.getItem(name)) {
    sessionStorage.removeItem(name);
  }
}

export function removeLocal(name: string) {
  if (localStorage.getItem(name)) {
    localStorage.removeItem(name);
  }
}
export function remove(name: string) {
  if (typeof sessionStorage === 'object') {
    if (sessionStorage.getItem(name)) {
      sessionStorage.removeItem(name);
    }
  }
  if (typeof localStorage === 'object') {
    if (localStorage.getItem(name)) {
      localStorage.removeItem(name);
    }
  }
}
