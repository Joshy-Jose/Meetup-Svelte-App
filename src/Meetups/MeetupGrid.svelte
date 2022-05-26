<script>
  import MeetupItem from "./MeetupItem.svelte";
  import MeetupFilter from "./MeetupFilter.svelte";
  import Button from "../UI/Button.svelte";
  import {createEventDispatcher} from 'svelte';
  import {scale} from 'svelte/transition';
  import {flip} from 'svelte/animate';

  export let meetups;

  const dispatch = createEventDispatcher();
  let favOnly = false;

  $:filteredMeetup = favOnly ? meetups.filter(m => m.isFavorite) : meetups;

  function setFilter (event) {
    console.log("event",event);
    favOnly = event.detail === 1;   //its return true;
    console.log(favOnly);
  }
</script>

<style>
  #meetups {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  #meetup-controls {
    margin: 1rem;
    display: flex;
    justify-content: space-between;
  }

  @media (min-width: 768px) {
    #meetups {
      grid-template-columns: repeat(2, 1fr);
    }
  }
    #no-meetups {
      margin: 1rem;
    }
</style>

<section id="meetup-controls">
  <MeetupFilter on:select={setFilter}/>
  <Button on:click={() => dispatch('add')}>New Meetup</Button>
</section>
{#if filteredMeetup.length === 0} 
<p id="no-meetups">No meetup found, please add some meetup.</p>
{/if}
<section id="meetups">
  {#each filteredMeetup as meetup (meetup.id)}
  <div transition:scale animate:flip={{duration:300}}>
    <MeetupItem 
    id={meetup.id}
    title={meetup.title}
    subtitle={meetup.subtitle}
    description={meetup.description}
    imageUrl={meetup.imageUrl}
    email={meetup.contactEmail}
    address={meetup.address}
    isFav={meetup.isFavorite}
    on:showdetails,
    on:edit
    />
  </div>

  {/each}
</section>
