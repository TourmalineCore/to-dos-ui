export function HomePage() {
  return (
    <div className="Home">
      Hello World!
      <br />
      <a
        href="/to-dos"
        data-cy="to-dos-page-link"
      >
        Go to ToDos!!!
      </a>
    </div>
  )
}
