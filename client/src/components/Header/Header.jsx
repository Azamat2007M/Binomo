import Slider from "react-slick";
import './header.scss'
import { Link } from 'react-router-dom';

const Header = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
  return (
    <>
        <header>
            <div className="case">
                <div className="banner">
                    <div className="h-left">
                        <h1 className="h-title">Smart investments</h1>
                        <b>Sign up and get $10,000 in a demo account. <br /> Improve your trading skills and open the broad spectrum of financial opportunities with Binomo.</b>
                        {localStorage.getItem('Access') ? (
                            <Link to={'/introductiondemo'}>
                                <button style={{width: '30%'}}>Try Demo</button>
                            </Link>
                        ) : (
                            <Link to={'/login'}>
                                <button style={{width: '30%'}}>Try Demo</button>
                            </Link>
                        )}
                    </div>
                    <div className="h-right">
                        <div className="h-line">
                            <img src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNDAgNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNS42MjIgMzEuMTUxYzQuMjItNC45OTEgNC42MDItOS4xMjIgNC4yOTgtMTIuNDQ0LS42NzctNy4zOTMtNi40NTktMTMuMDczLTExLjU3OC0xNS40M2ExMS44NDkgMTEuODQ5IDAgMCAwLS41NDYtLjIzYy0uNTItLjIwOC0uOTg2LjMxLTEuMDMuODY4LS4xMDYgMS4zMy0xLjEyNiAyLjg1My0yLjM0MiA0LjY3MS0xLjc3IDIuNjQ3LTMuOTU4IDUuOTE4LTQuMzUyIDEwLjEyLS43NiA4LjEyIDQuNzYyIDEyLjQ0NSA0Ljc2MiAxMi40NDVoMi42MmMuMDkxLjAwNSAyLjc2NS4wMDIgNC4zOTIuMDAxaDMuNzc2Wm0tMi41NDggMGMzLjU0LTQuOTkxIDUuMDM0LTkuNDk5IDQuNDk3LTEzLjU4NC0uNTUxLTQuMTk1LTMuNDkyLTguMTE4LTguNzktMTEuNzc0bC0uMzc1LS4yNTktLjE3My40MjFjLS42NDQgMS41NjYtMS41NyAzLjMxNy0yLjc3OSA1LjI1MS0yLjQyNCAzLjg4MS0zLjM3OSA2LjIyNC0zLjM3OSA5LjMxNyAwIDMuNTMgMS44MDEgNy4wODggNS4zNzggMTAuNjI4aDUuNjIxWm0tLjc2LS4xODljMy41NDQtNC45MzUgNS4wNDctOS4zNjcgNC41My0xMy4zLS41MDgtMy44NjMtMy4yMDItNy41MzQtOC4xMS0xMS4wMDctLjY1IDEuNDk2LTEuNTM1IDMuMTQyLTIuNjU4IDQuOTQtMi4zNTcgMy43NzMtMy4yNjcgNi4wMDctMy4yNjcgOC45MjggMCAzLjQyNSAxLjgzMyA2LjkwNCA1LjUyNSAxMC40NGwuMjMuMTg4aDMuNjFsLjE0LS4xODlaIiBmaWxsPSIjRkZGIi8+PHBhdGggZD0iTTI3LjExIDMyLjYxOEgxMy4zN2wtMi44NjMgMi41NnYxLjg0MWgxOS40NjV2LTEuODI3bC0yLjg2Mi0yLjU3NFoiIGZpbGw9IiNGRkYiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE3Ljc5MiAzMC40NjZjLS43ODUtLjQ2MS0yLjIwMS0yLjkzNS0zLjE4Ni00Ljk4OC0uOTg0LTIuMDUyLTEuNDY2LTIuMDUyLTEuNTk0LTQuMDUtLjEyOC0xLjk5OC4xMjgtMi40OTQuNzctNC4yODEuNjQzLTEuNzg3IDEuNzktMy4wMzUgMS43OS0zLjAzNXMuNjQ2LTEuMTY4IDEuMzQxLTIuMzA3IDEuMDE0LTEuNDE4IDEuNDItMi4yMThjLjQwOC0uNzk5LjY1Mi0xLjg0OS42NTItMS44NDlzLjcwOS43MjkgMS44NDggMS44NWMxLjEzOCAxLjEyIDEuNDYyIDEuMjM3IDIuMjg0IDIuMjE3LjgyMy45OCAxLjUxMiAyLjMwNyAxLjUxMiAyLjMwN2wxLjA2NCAyLjA5OXMuNiAxLjM3Mi42IDMuMTRjMCAxLjc2Ni0uNiAzLjU1My0uNiAzLjU1M2wtMS4wNjQgMi41NzRzLS40MTkgMS4wODMtMS4wNDMgMi41NjFjLS42MjQgMS40NzgtLjM0OCAxLjM3My0xLjIwMiAyLjE1OS0uODUzLjc4NS0yLjM5NC45NTMtMi4zOTQuOTUzcy0xLjQxNC0uMjIzLTIuMTk4LS42ODRaIiBmaWxsPSIjRkZGIi8+PC9zdmc+" alt="" />
                            <h1>IAIR Awards</h1>
                        </div>
                        <div className="h-line">
                            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAiIGhlaWdodD0iNzAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE3LjY0NSAyMC43OTJjLjI3LS4zNi40OTQtLjcxOC42NzQtMS4xMjJsMy40MTEtNi45MTVjMy4wOTgtLjk4OCA1LjAyOS0zLjkwNiA0LjYyNS03LjIyOC0uMDQ2LS4zMTUtLjM2LS40OTQtLjYzLS40NS0zLjE0Mi44MDktNS4xNjIgMy41OTMtNS4wMjcgNi44MjVsLTEuODg2IDMuNzcyYTYuNDA1IDYuNDA1IDAgMCAwLTEuNjYxLTMuMjMzYy0uMTgtLjIyNC0uNTM5LS4xOC0uNzE5LjA0NWE2LjM1MSA2LjM1MSAwIDAgMCAuNDUgOC4zMDZjLjI3LjIyNS41ODMuMjI1Ljc2MyAwWm0zNC4xMTggMGE1LjcyNiA1LjcyNiAwIDAgMS0uNjczLTEuMTIybC0zLjQxMi02LjkxNWMtMy4wOTgtLjk4OC01LjAyOC0zLjkwNi00LjYyNC03LjIyOC4wNDUtLjMxNS4zNTktLjQ5NC42MjgtLjQ1IDMuMTQzLjgwOSA1LjE2MyAzLjU5MyA1LjAyOSA2LjgyNWwxLjg4NSAzLjc3MmE2LjQwNSA2LjQwNSAwIDAgMSAxLjY2MS0zLjIzM2MuMTgtLjIyNC41NC0uMTguNzE5LjA0NWE2LjM1MSA2LjM1MSAwIDAgMS0uNDUgOC4zMDZjLS4yNjkuMjI1LS41ODMuMjI1LS43NjMgMFoiIGZpbGw9IiNmZmYiLz48Y2lyY2xlIGN4PSIzNS40MSIgY3k9IjI4LjA3NyIgcj0iMTUuNDEiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PGNpcmNsZSBjeD0iMzUuNDEiIGN5PSIyOC4wNzciIHI9IjExLjQ4NyIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik00MS45NzQgNTIuNjkzdi01Ljc0NEgyOC44NDZ2NS43NDRsLTUuNzQ0IDQuMTAydjguMjA2aDI0LjYxNnYtOC4yMDZsLTUuNzQ0LTQuMTAyWk0xNy41NDcgMjAuNzIyYy4yNjktLjM2LjQ5My0uNzE5LjY3My0xLjEyM2wzLjQxMi02LjkxNGMzLjA5OC0uOTg4IDUuMDI4LTMuOTA2IDQuNjI0LTcuMjI5LS4wNDUtLjMxNC0uMzYtLjQ5NC0uNjI5LS40NDktMy4xNDMuODA5LTUuMTYzIDMuNTkyLTUuMDI4IDYuODI1bC0xLjg4NiAzLjc3MWE2LjQwNCA2LjQwNCAwIDAgMC0xLjY2LTMuMjMyYy0uMTgtLjIyNS0uNTQtLjE4LS43Mi4wNDVhNi4zNTEgNi4zNTEgMCAwIDAgLjQ1IDguMzA2Yy4yNy4yMjQuNTg0LjIyNC43NjQgMFptMzQuMTE3IDBhNS43MiA1LjcyIDAgMCAxLS42NzMtMS4xMjNsLTMuNDEyLTYuOTE0Yy0zLjA5OC0uOTg4LTUuMDI4LTMuOTA2LTQuNjI0LTcuMjI5LjA0NS0uMzE0LjM2LS40OTQuNjI5LS40NDkgMy4xNDIuODA5IDUuMTYzIDMuNTkyIDUuMDI4IDYuODI1bDEuODg1IDMuNzcxYTYuNDA0IDYuNDA0IDAgMCAxIDEuNjYyLTMuMjMyYy4xOC0uMjI1LjUzOC0uMTguNzE4LjA0NWE2LjM1MSA2LjM1MSAwIDAgMS0uNDUgOC4zMDZjLS4yNjkuMjI0LS41ODMuMjI0LS43NjMgMFoiIGZpbGw9IiNmZmYiLz48Y2lyY2xlIGN4PSIzNS4zMTIiIGN5PSIyOC4wMDciIHI9IjE1LjQxIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjM1LjMxMSIgY3k9IjI4LjAwNyIgcj0iMTEuNDg3IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTQxLjg3NiA1Mi42MjN2LTUuNzQ0SDI4Ljc0N3Y1Ljc0NGwtNS43NDMgNC4xMDJ2OC4yMDVoMjQuNjE1di04LjIwNWwtNS43NDMtNC4xMDJaIiBmaWxsPSIjZmZmIi8+PC9zdmc+" alt="" />
                            <h1>FE Awards</h1>
                        </div>
                        <div className="h-line">
                            <img src="/header_3.svg" alt="" />
                            <h1>Financial <br /> Commission <br /> <span>Category A</span></h1>
                        </div>
                        <div className="h-line">
                            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAiIGhlaWdodD0iNzAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01My42OTUgNTMuNzVjLS4wODQgMC0uMjE0LS4wNDctLjU0Ny0uMjFMMzEuMTIyIDM4LjgxNWMtLjExLS4xMjUtLjI0Ny0uMzcyLS4yNDctLjUxVjEyLjIzYzAtLjQzMy4yNC0uNjY4LjcwMy0uNjY4VjEwYy0xLjMxNyAwLTIuMjY1LjkyNS0yLjI2NSAyLjIzdjI2LjA3NmMwIC42MzUuMzM3IDEuMjM4LjgyOCAxLjcxOWwyMi4yMyAxNC44NjZjLjY0OC4zMjUuOTEzLjQyMiAxLjMyNC40MjIuNjM1IDAgMS4yNDYtLjMyNiAxLjczNS0uODAybC4xMDEtLjEyM2MzLjI3NS00Ljg3IDUuMDMyLTEwLjM5NCA1LjAzMi0xNi4wODJDNjAuNTYzIDIyLjY2IDQ3LjU5IDEwIDMxLjU3OCAxMHYxLjU2M0M0Ni43MzggMTEuNTYzIDU5IDIzLjUzIDU5IDM4LjMwNWMwIDUuMzQyLTEuNjQ0IDEwLjUzOC00LjcxNyAxNS4xMzgtLjIxMS4xODctLjQ0Mi4zMDYtLjU4OC4zMDZaTTI1LjY4MyA0MC4xNzV2LTE5LjQzbC0uOTQ5LjIxMUMxNS42NDggMjIuOTYyIDkgMzAuOTggOSA0MC4xNzUgOSA1MS4xNjEgMTguMTI1IDYwIDI5LjQzOCA2MGM1LjIwMSAwIDEwLjA3My0xLjg0IDEzLjY4Ny01LjE4OGwuNzMtLjY3Ni0xNi41NC0xMC45NGMtMS4wMzctLjc1Ny0xLjYzMi0xLjg1Mi0xLjYzMi0zLjAydi0uMDAxWiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==" alt="" />
                            <h1>Quotes from <br /> leading agencies</h1>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <section>
            <div className="case">
                <div className="slider">
                    <h1 className="sl-content">Binomo Specials</h1>
                    <Slider {...settings}>
                        <div className="slider-container">
                            <div className='slider-card1'>
                                <b>The new VIP app is now available</b>
                                <h1>Binomo X: Energy of superiority <br /> in trading</h1>
                                <button>Upgrade</button>
                            </div>
                        </div>
                        <div className="slider-container">
                            <div className='slider-card2'>
                            <b>Binomo referral program</b>
                                <h1>Invite friends and get up <br /> to $100 to your real account</h1>
                                <button>Learn More</button>
                            </div>
                        </div>
                    </Slider>
                </div>
                <div className="s-count">
                    <h1>856 468</h1>
                    <b>Active traders daily</b>
                    <li></li>
                </div>
                <div className="s-count">
                    <h1>133</h1>
                    <b>Countries of presence</b>
                    <li></li>
                </div>
                <div className="s-count">
                    <h1>28 710 170</h1>
                    <b>Successful trades in the past week</b>
                </div>
            </div>

        </section>
        <section>
            <div className="case">
                <div className="content">
                    <h1>The benefits of the platform</h1>
                    <div className="c-four">
                        <div className="c-item">
                            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Im0xMy40MTQgMzUgMy4yOTMtMy4yOTNhMSAxIDAgMCAwLTEuNDE0LTEuNDE0TDEyIDMzLjU4NmwtMy4yOTMtMy4yOTNhLjk5OS45OTkgMCAxIDAtMS40MTQgMS40MTRMMTAuNTg2IDM1bC0zLjI5MyAzLjI5M2EuOTk5Ljk5OSAwIDEgMCAxLjQxNCAxLjQxNEwxMiAzNi40MTRsMy4yOTMgMy4yOTNhLjk5Ny45OTcgMCAwIDAgMS40MTQgMCAxIDEgMCAwIDAgMC0xLjQxNEwxMy40MTQgMzVaTTYgMTRoNHY0YTEgMSAwIDEgMCAyIDB2LTRoNGExIDEgMCAxIDAgMC0yaC00VjhhMSAxIDAgMSAwLTIgMHY0SDZhMSAxIDAgMSAwIDAgMlptMjQgMGgxMGExIDEgMCAxIDAgMC0ySDMwYTEgMSAwIDEgMCAwIDJabTEwIDIySDMwYTEgMSAwIDEgMCAwIDJoMTBhMSAxIDAgMSAwIDAtMlptMC00SDMwYTEgMSAwIDEgMCAwIDJoMTBhMSAxIDAgMSAwIDAtMloiIGZpbGw9IiNGRkRDNDgiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTQxIDQ2SDI0VjI0aDIydjE3YzAgMi43NTctMi4yNDMgNS01IDVaTTIgNDFWMjRoMjB2MjJIN2MtMi43NTcgMC01LTIuMjQzLTUtNVpNNyAyaDE1djIwSDJWN2MwLTIuNzU3IDIuMjQzLTUgNS01Wm0zOSA1djE1SDI0VjJoMTdjMi43NTcgMCA1IDIuMjQzIDUgNVptLTUtN0g3QzMuMTQxIDAgMCAzLjE0IDAgN3YzNGMwIDMuODYgMy4xNDEgNyA3IDdoMzRjMy44NTkgMCA3LTMuMTQgNy03VjdjMC0zLjg2LTMuMTQxLTctNy03WiIgZmlsbD0iI0ZGREM0OCIvPjwvc3ZnPg==" alt="" />
                            <h1>Minimum account balance <br /> from $10</h1>
                            <p>Start making trades with minimum investments.</p>
                        </div>
                        <div className="c-item">
                            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDIiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zNyAzNi40NzZWMjRoM3Y3LjUxNWMtLjE2My40ODgtLjkxOSAyLjQ5NS0zIDQuOTYxWk0yIDMxLjUxMlYyNGgxOHYyMS42NThDNS43MzEgNDEuMjIzIDIuMzY3IDMyLjU5IDIgMzEuNTEyWk01IDUuNDc2VjIySDJWMy44OTlhMjMuMjA5IDIzLjIwOSAwIDAgMCAzIDEuNTc3Wm03IDEuMjY2YTEzLjc2MiAxMy43NjIgMCAwIDAgMy0uNTQzVjIyaC0zVjYuNzQyWk0xMCAyMkg3VjYuMjAyYzEuMDA1LjI5MyAxLjk5OS40NzggMyAuNTVWMjJaTTIwIDMuNDUxVjIyaC0zVjUuNDA3YTEzLjcxNyAxMy43MTcgMCAwIDAgMy0xLjk1NlpNMjcgMjRoM3YxOC4yMTFhMzQuMjcyIDM0LjI3MiAwIDAgMS0zIDEuNTVWMjRabS01IDBoM3YyMC42MTNjLS45NC4zNjktMS45NDMuNzE3LTMgMS4wNDVWMjRabTEzIDE0LjU1OWEyNi44ODcgMjYuODg3IDAgMCAxLTMgMi4zOVYyNGgzdjE0LjU1OVpNMzAuOTc1IDYuNzkxYzIuOTY0IDAgNS44MDQtLjkwMSA5LjAyNS0yLjg5MlYyMkgyMlYzLjQ1M2ExMy42OTUgMTMuNjk1IDAgMCAwIDguOTc1IDMuMzM4Wm0xMC40ODctNS42MzVhLjk5Ni45OTYgMCAwIDAtMS4wMzQuMDY3Yy0zLjUzNCAyLjQ2OC02LjQ1IDMuNTY4LTkuNDUzIDMuNTY4LTMuNTc1IDAtNi45Mi0xLjYxLTkuMTgtNC40MTgtLjAxOC0uMDIyLS4wNDgtLjAzLS4wNjgtLjA1QS45NzMuOTczIDAgMCAwIDIxLjUuMTU0Yy0uMDI1LS4wMTQtLjA0My0uMDM2LS4wNy0uMDQ3QS45NzYuOTc2IDAgMCAwIDIxIDBhLjk3MS45NzEgMCAwIDAtLjQyOS4xMDZjLS4wMzUuMDE0LS4wNTkuMDQ0LS4wOTIuMDYxLS4wNzMuMDQ2LS4xNDYuMDktLjIwNC4xNTMtLjAyMi4wMjEtLjA1My4wMjktLjA3Mi4wNTMtMi4yNiAyLjgwOC01LjYwNCA0LjQxOC05LjE3OCA0LjQxOC0zLjAwNCAwLTUuOTIxLTEuMS05LjQ1Mi0zLjU2OGEuOTk4Ljk5OCAwIDAgMC0xLjAzNS0uMDY3Ljk5Ny45OTcgMCAwIDAtLjUzOC44ODZ2MjkuNjI0YzAgLjA5LjAxMi4xNzkuMDM2LjI2Ni4xMjQuNDUyIDMuMjUxIDExLjE0MyAyMC42OTQgMTYuMDMxQS45NTEuOTUxIDAgMCAwIDIxIDQ4YS45NTEuOTUxIDAgMCAwIC4yNy0uMDM3YzE3LjQ0My00Ljg4OCAyMC41Ny0xNS41NzkgMjAuNjk0LTE2LjAzMWEuOTk4Ljk5OCAwIDAgMCAuMDM2LS4yNjZWMi4wNDJhLjk5Ny45OTcgMCAwIDAtLjUzOC0uODg2WiIgZmlsbD0iI0ZGREM0OCIvPjwvc3ZnPg==" alt="" />
                            <h1>Trade amount <br /> starting from $1</h1>
                            <p>The minimum cost of a trade is quite low. You won't lose <br /> a large amount of funds while you're still learning how to trade.</p>
                        </div>
                        <div className="c-item">
                            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDUiIGhlaWdodD0iNDkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yLjUgNDcuNXYtNDZhMSAxIDAgMSAwLTIgMHY0NmExIDEgMCAxIDAgMiAwWm00MC0zOHYzOGExIDEgMCAxIDAgMiAwdi0zOGExIDEgMCAxIDAtMiAwWm0tNCAzOHYtMzJhMSAxIDAgMSAwLTIgMHYzMmExIDEgMCAxIDAgMiAwWm0tNiAwdi0zOGExIDEgMCAxIDAtMiAwdjM4YTEgMSAwIDEgMCAyIDBabS02IDB2LTQ2YTEgMSAwIDEgMC0yIDB2NDZhMSAxIDAgMSAwIDIgMFptLTYgMHYtMzhhMSAxIDAgMSAwLTIgMHYzOGExIDEgMCAxIDAgMiAwWm0tNiAwdi0zMmExIDEgMCAxIDAtMiAwdjMyYTEgMSAwIDEgMCAyIDBabS02IDB2LTM4YTEgMSAwIDEgMC0yIDB2MzhhMSAxIDAgMSAwIDIgMFoiIGZpbGw9IiNGRkRDNDgiLz48L3N2Zz4=" alt="" />
                            <h1>A unique mode <br /> of trading: ‘Non-stop’</h1>
                            <p>There are no restrictions on the platform regarding the <br /> number of trades that can be concluded simultaneously. You <br /> can open several positions at the same time and continue <br /> trading.</p>
                        </div>
                        <div className="c-item">
                            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yIDE2aDQ0djMwSDJWMTZaTTggNnYzYTEgMSAwIDAgMCAxIDFoNmExIDEgMCAwIDAgMS0xVjZoMTZ2M2ExIDEgMCAwIDAgMSAxaDZhMSAxIDAgMCAwIDEtMVY2aDZ2OEgyVjZoNlptMi00aDR2NmgtNFYyWm0yNCAwaDR2NmgtNFYyWm0xMyAyaC03VjFhMSAxIDAgMCAwLTEtMWgtNmExIDEgMCAwIDAtMSAxdjNIMTZWMWExIDEgMCAwIDAtMS0xSDlhMSAxIDAgMCAwLTEgMXYzSDFhMSAxIDAgMCAwLTEgMXY0MmExIDEgMCAwIDAgMSAxaDQ2YTEgMSAwIDAgMCAxLTFWNWExIDEgMCAwIDAtMS0xWiIgZmlsbD0iI0ZGREM0OCIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjMgMzhoLTNWMjNhMS4wMDIgMS4wMDIgMCAwIDAtMS43MDctLjcwN2wtNCA0YS45OTkuOTk5IDAgMSAwIDEuNDE0IDEuNDE0TDE4IDI1LjQxNFYzOGgtM2ExIDEgMCAxIDAgMCAyaDhhMSAxIDAgMSAwIDAtMlptMTEtMTZIMjRhMSAxIDAgMCAwLTEgMXYyYTEgMSAwIDEgMCAyIDB2LTFoNy41NTdsLTIuMjUgNkgyN2ExIDEgMCAxIDAgMCAyaDIuNTU3bC0yLjQ5NCA2LjY0OEExLjAwMyAxLjAwMyAwIDAgMCAyOCA0MGMuNDA1IDAgLjc4Ni0uMjQ3LjkzNy0uNjQ4TDMxLjY5MyAzMkgzM2ExIDEgMCAxIDAgMC0yaC0uNTU3bDIuNDk0LTYuNjQ4QTEuMDAzIDEuMDAzIDAgMCAwIDM0IDIyWiIgZmlsbD0iI0ZGREM0OCIvPjwvc3ZnPg==" alt="" />
                            <h1>Work also <br /> on the weekends</h1>
                            <p>Some quotes sources are available only on working days. We <br /> combined various options for your convenience: trade even on <br /> weekends choosing the most suitable assets.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Header