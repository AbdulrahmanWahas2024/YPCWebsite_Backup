// website/ypc.com/lib/erpService.ts

export const getFrappeData = async (method: string) => {
    // استبدل السطر القديم بهذا السطر المباشر
    //onst API_URL = "http://192.168.4.177";
    const API_KEY = "ae2a2da64f0b77f";
    const API_SECRET = "0ee016b93b8e33c";
    const currentHost = typeof window !== 'undefined' ? window.location.hostname : '192.168.4.176';
    const API_URL = `http://${currentHost}`;
    try {
        const response = await fetch(`${API_URL}/api/method/${method}`, {
            method: 'GET',
            headers: {
                'Authorization': `token ${API_KEY}:${API_SECRET}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error: any) {
        console.error("❌ خطأ في الاتصال:", error);
        return { error: true, message: error.message };
    }
};