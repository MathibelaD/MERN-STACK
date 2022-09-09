import { useState } from "react"

const WorkoutForm = () => {
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState('')


    const onSubmit = async (e) => {
        e.preventDefault()

        const workout = {title, load, reps}

        const response = await fetch('/api/workouts',{
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if (response.ok){
            setError(null)
            setTitle('')
            setLoad('')
            setReps('')
            console.log('new workout added', json)
        }
    }

    return (
        <div>
            <form className="create" onSubmit={onSubmit}>
                <h3>Add a New Workout</h3>

                <label>Exercize Title</label>
                <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                />

                <label>Load (in kg)</label>
                <input 
                type="Number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                />

                <label>Reps</label>
                <input 
                type="Number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                />
                <button>Add Workout</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default WorkoutForm