<script>
import {
  endent,
  join,
  map,
  pullAt,
  range,
  stubObject,
} from '@dword-design/functions'
import FaPlus from '@fortawesome/fontawesome-free/svgs/solid/plus.svg'
import FaTrash from '@fortawesome/fontawesome-free/svgs/solid/trash.svg'

import selectAll from '@/model/select-all'

export default {
  computed: {
    code() {
      return endent`
        <table>
          ${
            this.rows
            |> map(
              row =>
                endent`
              <tr>
                <td width="50px">${row.date || ''}</td>
                <td>${row.eventName || ''}</td>
              </tr>
            `
            )
            |> join('\n')
          }
        </table>
      `
    },
  },
  data: () => ({
    rows: range(2) |> map(stubObject),
  }),
  render() {
    return (
      <div>
        <h1>Events Table Editor</h1>
        <section class="section">
          <div class="stack">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Datum</th>
                  <th>Veranstaltung</th>
                </tr>
              </thead>
              <tbody>
                {this.rows
                  |> map((row, index) => (
                    <tr>
                      <td class="data-cell" width="20%">
                        <input type="text" v-model={row.date} />
                      </td>
                      <td class="data-cell">
                        <input type="text" v-model={row.eventName} />
                      </td>
                      <td class="action-cell">
                        <ui-button
                          icon={FaTrash}
                          v-on:click={() =>
                            (this.rows = this.rows |> pullAt(index))
                          }
                          variant="danger"
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <ui-button
              icon={FaPlus}
              v-on:click={() => (this.rows = [...this.rows, {}])}
            >
              Zeile hinzufügen
            </ui-button>
          </div>
        </section>
        <section class="section">
          <vue-prism
            language="html"
            v-on:click={$event => selectAll($event.target)}
          >
            {this.code}
          </vue-prism>
        </section>
      </div>
    )
  },
}
</script>
