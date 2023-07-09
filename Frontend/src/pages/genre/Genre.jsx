import Navbar from "../../components/navbar/Navbar"
import "./genre.scss"
import { Helmet } from "react-helmet";
import SelectFavouriteGenre from "../../components/selectFavouriteGenre/SelectFavouriteGenre";

const TITLE = "NeoMovie";

const Genre = () => {
  return (
    <div className='genre'>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
        <Navbar/>
        <SelectFavouriteGenre/>
    </div>
  )
}

export default Genre