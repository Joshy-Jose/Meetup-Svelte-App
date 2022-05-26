<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import meetups from "./Meetups/meetups-store.js";
  import MeetupDetail from "./Meetups/MeetupDetail.svelte";
  import LoadingSpinner from './UI/LoadingSpinner.svelte';
  import Error from './UI/Error.svelte';

  let editMode;
  let page = 'overview';
  let pagedata = {};
  let editedId;
  let isLoading = true;
  let error;


  fetch("https://meetup-svelte-f7f1d-default-rtdb.europe-west1.firebasedatabase.app/meetups.json")
  .then(res => {
    if(!res.ok) {
      throw new Error('Failed!');
    }
    return res.json();
  })
  .then(data => {
    console.log("data",data);
    const loadedMeetups = [];
    for (const key in data){
      loadedMeetups.push({
        ...data[key],
        id: key
      })
    }
    setTimeout(() => {
      isLoading = false;
      meetups.setMeetups(loadedMeetups.reverse()); //show last inserted on first o
    }, 1000);
    
  })
  .catch(err => {
    error = err;
    isLoading = false;
    console.log(err);
  })

  function saveMeetup(event) {

    editMode = null;
    editedId = null;
  }

  function cancelEdit() {
    editMode = null;
    editedId = null;
  }

  function showdetails(event) {
    page = 'details';
    pagedata.id = event.detail;
  }
  function closeDetails () {
    page= 'overview';
    pagedata = {};
  }
  function startEdit (event) {
    editMode = 'edit';
    editedId = event.detail;
  }
  function clearError () {
    error =null;
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }


</style>

<Header />
{#if error}
<Error message = {error.message} on:cancel={clearError}/>
{/if}

<main>
  {#if page === 'overview'}

  {#if editMode === 'edit'}
    <EditMeetup id={editedId} on:save={saveMeetup} on:cancel={cancelEdit} />
  {/if}
  {#if isLoading} 
    <LoadingSpinner/>
  {:else}
  <MeetupGrid 
    meetups= {$meetups} 
    on:showdetails={showdetails} 
    on:edit={startEdit}
    on:add={() => {editMode = 'edit'}}/>
    {/if}
  {:else}
  <MeetupDetail id ={pagedata.id} on:close ={closeDetails} />
 {/if}
</main>
