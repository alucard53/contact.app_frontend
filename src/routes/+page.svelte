<script lang="ts">
    import { onMount } from "svelte";

    let contacts: App.Contact[] = [];
    let email = "";

    onMount(async function () {
        try {
            const res = await fetch("http://localhost:6969/contacts");
            const data = await res.json();

            if (data) {
                contacts = data;
            }
        } catch (e) {
            console.log("Failed to fetch from server");
            console.log(e);
        }
        console.log(contacts);
    });

    async function handleSearch() {
        console.log(email);
        try {
            const res = await fetch(
                `http://localhost:6969/contacts?e=${email}`
            );
            contacts = await res.json();
        } catch (e) {
            console.log(e);
        }
    }
</script>

<form
    on:submit|preventDefault={handleSearch}
    class="flex flex-row tems-center mb-10"
>
    <input
        class="bg-gray-200 appearance-none border-b-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mr-5"
        type="text"
        name="email"
        placeholder="Enter name/email"
        bind:value={email}
    />
    <button
        type="submit"
        class="bg-gray-200 hover:bg-gray-400 px-4 border border-gray-800 rounded"
        >Search</button
    >
</form>

<div class="flex flex-col">
    <div class="grid auto-rows-auto">
        <div class="grid grid-cols-5 border-b-2 border-black font-bold gap-10">
            <span>First Name</span>
            <span>Last Name</span>
            <span>Phone Number</span>
            <span>Email</span>
        </div>
        {#each contacts as contact (contact.phone)}
            <div
                class="grid grid-cols-5 py-2 gap-10 last:border-b-2 border-black pb-1"
            >
                <span>{contact.firstName}</span>
                <span>{contact.lastName}</span>
                <span>{contact.phone}</span>
                <span>{contact.email}</span>
                <span>
                    <a
                        href={`/edit/${contact.email}`}
                        class="text-green-500 underline hover:text-violet-500"
                        >edit</a
                    >
                    <a
                        href={`/contact/${contact.email}`}
                        class="text-green-500 underline hover:text-violet-500"
                        >view</a
                    >
                </span>
            </div>
        {/each}
    </div>
    <span class="w-full mt-5"
        ><a
            href="/addContact"
            class="text-xl text-green-500 underline hover:text-violet-500"
            >add contact</a
        ></span
    >
</div>

<style>
</style>
