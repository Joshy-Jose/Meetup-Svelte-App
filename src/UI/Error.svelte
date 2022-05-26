<script>
    import Modal from '../UI/Modal.svelte';

    export let message;
</script>

<Modal title="AN error occured!" on:cancel>
    <p>{message}</p>
</Modal>