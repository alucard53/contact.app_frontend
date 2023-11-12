<script lang="ts">
    import { page } from "$app/stores";
    import Form from "$lib/form.svelte";

    async function handleSearch(event: CustomEvent<any>) {
        const form = event.detail.form;

        try {
            const res = await fetch(
                `http://localhost:6969/contacts?e=${$page.params.slug}`,
                {
                    method: "PUT",
                    body: JSON.stringify({ ...form }),
                }
            );

            if (res.status === 200) {
                window.location.replace("/");
            } else {
                console.log("Failed to update db");
            }
        } catch (e) {
            console.log(e);
        }
    }
</script>

<Form on:submit={handleSearch} />
