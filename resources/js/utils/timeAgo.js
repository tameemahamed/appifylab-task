export default function timeAgo(ts) {
    if (!ts) return '';
    const diff = Math.max(0, Date.now() - new Date(ts).getTime());
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins} minute${mins === 1 ? "" : "s"} ago`;
    
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hour${hrs === 1 ? "" : "s"} ago`;
    
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
    
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
    
    return `${Math.floor(days / 365)} year${Math.floor(days / 365) === 1 ? "" : "s"} ago`;
}
