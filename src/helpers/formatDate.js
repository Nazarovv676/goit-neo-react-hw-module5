export function formatDate(dateString) {
    const date = new Date(dateString);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1)
        return `${diffDays} day ago`;
    else if (diffDays <= 28) {
        return `${diffDays} days ago`;
    } else {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('eng-EN', options);
    }
}