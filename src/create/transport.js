// /task

export async function sendTasks(data) {
    const response = await fetch('https://math-generator-7450.onrender.com/task', {
        method: 'POST',
        body: getSendTasksRequestModel(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await response.json()
}

function choiseTitle(title) {
    if (title  === 'Метод матричного исчисления' || title === 'Формулы Крамера' || title === 'Метод Гаусса') {
        return ("Системы линейных уравнений")
    }
    return title
}

export function getSendTasksRequestModel(check) {
    const requestModel = check.themes
        .filter(element => element.isVisible)
        .map(element => ({
            title: choiseTitle(element.title),
            complexity: +element.selectedComplexity,
            count: +element.count || 1
        }));


    return JSON.stringify(requestModel);
}

export async function getTasksXML() {
    const response = await fetch('https://math-generator-7450.onrender.com/convert', {
        method: 'GET',
    });
    return await response.blob()
}
