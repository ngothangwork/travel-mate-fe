export const loginWithGoogle = async (credential) => {
    const response = await fetch("http://localhost:8080/auth/google", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ credential })
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Lỗi từ server:", errorText);
        throw new Error("Đăng nhập thất bại");
    }
    return await response.json();
};
