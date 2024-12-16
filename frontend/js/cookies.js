function set_cookie(cname, cvalue)
{
    const date = new Date();
    date.setTime(date.getTime() + (365*24*60*60*1000));
    let expires = "expires="+ date.toUTCString() + ";";
    document.cookie = cname + "=" + cvalue + ";" + expires
}

function read_cookie(cname)
{
    return document.cookie.split("; ")
    .find((cookie) => cookie.startsWith(cname + "="))
    ?.split("=")[1];
}

export {
    set_cookie,
    read_cookie
}