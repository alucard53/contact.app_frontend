<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";

    let contact: App.Contact = {
        firstName: "",
        lastName: "",
        email: "",
        phone: 0,
    };

    onMount(async function () {
        try {
            const res = await fetch(
                `http://localhost:6969/contacts?e=${$page.params.slug}`
            );
            const data = await res.json();
            if (data.length > 0) {
                contact = data[0];
            }
        } catch (e) {
            console.log(e);
        }
    });

    async function deleteContact() {
        try {
            const res = await fetch(
                `http://localhost:6969/contacts?e=${contact.email}`,
                {
                    method: "DELETE",
                }
            );
            if (res.status === 200) {
                window.location.replace("/");
            }
        } catch (e) {
            console.log(e);
        }
    }
</script>

<div
    class="flex flex-col p-5 items-center border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-all duration-700"
>
    <h1 class="text-4xl mb-7">
        {contact.firstName + " " + contact.lastName}
    </h1>
    <div class="grid grid-cols-2 gap-0 mb-5">
        <span>Phone:</span>
        <span>{contact.phone}</span>
        <span>Email:</span><span>{contact.email}</span>
    </div>
    <div class="w-full flex">
        <div class="w-3/5 flex items-end gap-3 justify-end">
            <a
                href={`/edit/${$page.params.slug}`}
                class="text-green-500 underline hover:text-violet-500">Edit</a
            >
            <a href="/" class="text-green-500 underline hover:text-violet-500"
                >Back</a
            >
        </div>
        <button
            on:click={deleteContact}
            class="text-red-500 underline hover:text-red-600 w-2/5 text-end"
            >Delete</button
        >
    </div>
</div>
