import "./styles.css";

import { MdStorefront } from "react-icons/md";
import { BiSolidUpArrowAlt } from "react-icons/bi"
import { RiMapPin2Line } from "react-icons/ri";
import { TbTempleHindu } from "react-icons/tb"
import { GiIndiaGate } from "react-icons/gi"
function Navbarjs() {
  return (
    <nav class="menu" id="menu">
      <input class="menu-toggler" type="checkbox" />
      <label for="menu-toggler"></label>

      <ul
        style={{
          transition: "all 300ms linear",
        }}
      >
        <li class="menu-item">
        <a href="/india"><RiMapPin2Line  /></a>
        </li>
        <li class="menu-item">
        <a href="/trade"><MdStorefront /></a>
        </li>
        <li class="menu-item">
          <a class="flex items-center" href="/india">  </a>
        </li>
        <li class="menu-item">
          <a class="" href="#top-section"><BiSolidUpArrowAlt /></a>
        </li>
        <li class="menu-item">
          <a class="fa fa-users" href="#my-footer"></a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbarjs;
