// generic helpers
const addLead = (num) => ((num < 10) ? '0' + num : '' + num);

export const now = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = addLead(today.getMonth() + 1);
    const dd = addLead(today.getDate());
    const time = today.toTimeString().slice(0, 8).replace(/:/g, '');
    return `${yyyy}${mm}${dd}-${time}`;
}

export const initials = (name) => {
    if (!name) return '';
    return name.split(' ').map(word => {
        return word[0];
    }).filter(letter => {
        return letter && letter.match(/[A-zÀ-ú]/);
    }).join('')
};

// date helpers
const makeStr = (date) => {
    const yyyy = date.getFullYear();
    const m = date.getMonth() + 1;
    const mm = (m < 10) ? '0' + m : '' + m;
    const d = date.getDate();
    const dd = (d < 10) ? '0' + d : '' + d;
    return `${yyyy}-${mm}-${dd}`;
};
export const expireDate = (dateStr) => {
    let expDate = new Date(dateStr);
    expDate.setDate(expDate.getDate() + 30);
    return makeStr(expDate);
};