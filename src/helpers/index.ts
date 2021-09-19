
    export const getFormattedDate = () => {
        const date = new Date();
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
      
        return month + '/' + day + '/' + year;
    }

    export const randomIndex = (min: number, max: number) =>  Math.floor(Math.random() * (max - min + 1) + min);

    export const formatQuestion = (question: string) => question.replace(/&quot;/g, '"');