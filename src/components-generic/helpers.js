// generic helpers
const addLead = (num) => ((num < 10)? '0' + num : '' + num);

export const now = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = addLead(today.getMonth()+1);
    const dd = addLead(today.getDate());
    const time = today.toTimeString().slice(0,8).replace(/:/g,'');
    return `${yyyy}${mm}${dd}-${time}`;
}