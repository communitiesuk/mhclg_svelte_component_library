<div class="g-top-level-container">
  <h2>User guide</h2>

  <div class="mt-10 flex flex-col gap-20">
    <div>
      <h4>Adding a component</h4>

      <div class="grid-container mt-6">
        <div class="col1">1.</div>
        <div class="col2">Create .svelte file</div>
        <div class="col3">
          Add a new .svelte file in the <code>lib/components</code> folder.
        </div>
      </div>
    </div>

    <h4>Best practice guidlines for building components</h4>
  </div>
</div>

<style>
  .grid-container {
    display: grid;
    grid-template-columns: auto minmax(auto, 200px) 1fr; /* 1st column: auto, 2nd column: auto with max 200px, 3rd column: remaining space */
    gap: 10px; /* Optional spacing between columns */
    align-items: start; /* Ensure alignment */
  }

  .col1,
  .col2,
  .col3 {
    padding: 10px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
  }

  .col1 {
    font-size: 2rem;
    font-weight: bold;
  }
</style>
