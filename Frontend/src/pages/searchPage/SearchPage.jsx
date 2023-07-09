import Navbar from "../../components/navbar/Navbar"
import "./searchPage.scss"
import List from "../../components/list/List";
import { Helmet } from "react-helmet";
import Search from "../../components/search/Search";

const TITLE = "NeoMovie";

const SearchPage = () => {
  return (
    <div className='searchPage'>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
        <Navbar/>
        <Search/>
    </div>
  )
}

export default SearchPage