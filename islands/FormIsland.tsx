// islands/FormIsland.tsx
import { useState } from "preact/hooks";

interface FormData {
    name: string;
    email: string;
    message: string;
}

export default function FormIsland() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        setFormData({ ...formData, [target.name]: target.value });
    };

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        try {
            const response = await fetch(
                "https://script.google.com/macros/s/AKfycbzwoAreRREnRBWNFeSUZDqAouIcocqdVkNQA0rIpgVQw9E5rHeG-U0yp6vJP5DHCveC1g/exec",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                },
            );
            if (response.ok) {
                alert("Form submitted successfully!");
            } else {
                alert("There was an error submitting the form.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Submission failed.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            class="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-4"
        >
            <div>
                <label class="block text-gray-700">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onInput={handleChange}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div>
                <label class="block text-gray-700">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onInput={handleChange}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div>
                <label class="block text-gray-700">Message</label>
                <textarea
                    name="message"
                    value={formData.message}
                    onInput={handleChange}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                >
                </textarea>
            </div>
            <button
                type="submit"
                class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
                Send
            </button>
        </form>
    );
}
