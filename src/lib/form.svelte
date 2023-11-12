<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import { page } from "$app/stores";

    let form = {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
    };
    const dispatch = createEventDispatcher();

    onMount(async function () {
        console.log($page.params.slug);
        if ($page.route.id?.split("/")[1] === "edit") {
            try {
                const res = await fetch(
                    `http://localhost:6969/contacts?e=${$page.params.slug}`
                );
                const data = (await res.json())[0];

                form.firstName = data.firstName;
                form.lastName = data.lastName;
                form.phone = data.phone;
                form.email = data.email;
            } catch (e) {
                console.log(e);
            }
        }
    });
</script>

<form
    on:submit|preventDefault={() => dispatch("submit", { form })}
    class="flex flex-col gap-5"
>
    <span>
        <label for="email">Email ID:</label>
        <input
            class="bg-gray-200 appearance-none border-b-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mr-5"
            type="email"
            name="email"
            placeholder="email"
            bind:value={form.email}
        />
    </span>

    <span>
        <label for="firstName">First Name:</label>
        <input
            class="bg-gray-200 appearance-none border-b-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mr-5"
            type="text"
            name="text"
            placeholder="first name"
            bind:value={form.firstName}
        />
    </span>
    <span>
        <label for="lastName">Last Name:</label>
        <input
            class="bg-gray-200 appearance-none border-b-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mr-5"
            type="text"
            name="lastName"
            placeholder="last name"
            bind:value={form.lastName}
        />
    </span>
    <span>
        <label for="phone">Phone Number:</label>
        <input
            class="bg-gray-200 appearance-none border-b-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mr-5"
            type="number"
            name="phone"
            placeholder="phone"
            bind:value={form.phone}
        />
    </span>

    <button
        type="submit"
        class="bg-gray-200 hover:bg-gray-400 px-4 border border-gray-800 rounded"
        >Submit</button
    >
</form>
