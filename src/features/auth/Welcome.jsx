import { Link } from "react-router";

const Welcome = () => {

    const date = new Date();
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long'}).format(date);
    const content = (
        <main className="p-5">
            <p>{today}</p>
            <h1>Welcome!</h1>
            <p><Link to='/dash/notes'>View techNotes</Link></p>
            <p><Link to='/dash/users'>View User Settings</Link></p>
        </main>
    )

    return content;
}

export default Welcome;