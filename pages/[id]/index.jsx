import router from 'next/dist/server/router'
import Link from 'next/link'
import conectarDB from '../../lib/dbConnect'
import Movie from '../../models/Movie'


const MoviePage=({success,error,movie})=> {
  if(!success){
   return(
    <div className="container text-center my-5">
    <h1>{error} 🤐</h1>
    <Link  href="/">
    <a className="btn btn-success">Volver</a>
    </Link>
  </div>
   )
  }
  const deleteMovie =async (id)=>{
    try {
      await fecth(`/api/movie/${id}`,{
      method : "DELETE",
      })
      router.push('/')
    } catch (error) {
        console.log(error)
    }
  }
    return (
        <div className="containter">
            <h1 className="text-center">Detalle de la movie</h1>
            <div className="card">
              <div className="card-body">
                <div className="card-title">
                <h4 className="text-uppercase">{movie.title}</h4>
                </div>
                    <p className="fw-light">{movie.plot}</p>
                    <Link  href="/">
                    <a className="btn btn-success btn-sm me-2">Volver</a>
                    </Link>
                    <Link  href={`/${movie._id}/edit`}>
                    <a className="btn btn-warning btn-sm me-2">Editar</a>
                    </Link>
                    <button className="btn btn-danger btn-sm">Eliminar</button>
              </div>
            </div>
        </div>
    )
}

export default MoviePage;

export async function getServerSideProps({params}) {
    try {
      await conectarDB();

        const movie = await Movie.findById(params.id).lean()
      console.log(movie);
        if(!movie){
            return {props:{success:false,error:'Pelicula no encontrada'}}
        }
        movie._id = `${movie._id}`


      // console.log(res)

      return {props:{success:true,movie}}
    } catch (error) {
      console.log(error);
      if(error.kind ==='ObjectId'){
        return {props:{success:false,error:'Id no valido'}}
      }
      return {props:{success:false,error:'Error en el servidor'}}

    }
  }