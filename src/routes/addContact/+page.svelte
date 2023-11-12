<script lang="ts">
    import Form from "$lib/form.svelte";

    async function handleSearch(event: CustomEvent<any>) {
        const form = event.detail.form;
        console.log(form);
        try {
            const res = await fetch("http://localhost:6969/contacts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...form }),
            });
            console.log(res.status);
            if (res.status === 200) {
                console.log("Redirecting");
                window.location.replace("/");
            }
        } catch (e) {
            console.log(e);
        }
    }
</script>

<Form on:submit={handleSearch} />
