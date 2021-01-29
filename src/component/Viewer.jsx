import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { loaderActions } from '../store/actions'

import pdfjs from 'pdfjs-dist'
import * as pdfjsViewer from 'pdfjs-dist/web/pdf_viewer'

import ThumbnailViewer from './ThumbnailViewer'
import PreViewer from './PreViewer'
import CompleteViewer from './CompleteViewer'
import Follower from "./Follower"
import GetWindowSize from '../hook/get-width'

const url = "/testsapmle.pdf"

const Viewer = (props, { src = url }) => {

  const { controller, composer } = props

  const [ loaded, setLoaded ] = useState(false)
  const [ viewer, setViewer ] = useState(null)
  const [ pdfRef, setPdfRef ] = useState(null)
  const [ pageNum, setPageNum ] = useState(null)
  const [ components, setComponents ] = useState({
    items: []
  })
  const pdfRefViewer = useRef(null)
  const windowSize = GetWindowSize()

  const pdfLinkService = new pdfjsViewer.PDFLinkService()
  const pdfRenderingQueue = new pdfjsViewer.PDFRenderingQueue()

  // 필요 없으나.. 지금은 냅둔다..
  const pdfAnnotationLayer = new pdfjsViewer.PDFAnnotationLayer({
    annoMode: 'COMPOSE',
    sourceScale: 'auto'
  })

  const loadViewer = (pdfDoc) => {

    /***********
      pdf
    ************/

    const container = document.getElementById('viewerContainer')
    const pdfViewer = new pdfjsViewer.PDFViewer({
      container: container,
      linkService: pdfLinkService,
      renderingQueue: pdfRenderingQueue,
      pdfAnnotationLayer: pdfAnnotationLayer
    })

    pdfViewer.setDocument(pdfDoc)
    pdfLinkService.setViewer(pdfViewer)
    pdfLinkService.setDocument(pdfDoc)
    pdfRenderingQueue.setViewer(pdfViewer)
    pdfAnnotationLayer.setViewer(pdfViewer)
    setViewer(pdfViewer)

    document.addEventListener('pagesinit', function(e) {
      pdfViewer.currentScaleValue = controller.currentScale ? controller.currentScale : 'auto' // auto, page-actual
    })

    /***********
      thumbnail
    ************/

    const thumbContainer = document.getElementById('thumbnailView')
    const pdfThumbnailViewer = new pdfjsViewer.PDFThumbnailViewer({
      container: thumbContainer,
      renderingQueue: pdfRenderingQueue,
      linkService: pdfLinkService
    })

    pdfThumbnailViewer.setDocument(pdfDoc)
    pdfRenderingQueue.setThumbnailViewer(pdfThumbnailViewer)
    pdfRenderingQueue.isThumbnailViewEnabled = true

    document.addEventListener('pagechanging', function(e) {
      const page = e.detail.pageNumber
      pdfThumbnailViewer.scrollThumbnailIntoView(page)
    })
  }

  const fetchPdf = async () => {
    const loadingTask = pdfjs.getDocument(src)
    const pdfDoc = await loadingTask.promise.then(function(pdfDoc) {
      setPageNum(pdfDoc.numPages)
      setLoaded(true)
      loadViewer(pdfDoc)
    })
  }

  const scaleChange = () => {

    /* 야 이거 이상하네~
    if(pdfRefViewer.current && viewer) {
      const thumbnailWidth = document.getElementsByClassName('thumbnail-wrap')[0].offsetWidth
      const composerWidth = document.getElementsByClassName('composer-wrap')[0].offsetWidth
      const canvasWidth = document.getElementsByClassName('pdfAnnotationLayer')[0].offsetWidth

      if((windowSize.width - thumbnailWidth - composerWidth) < canvasWidth) {
        // viewer.currentScaleValue = 'auto' ? viewer.currentScaleValue = 'auto' : console.log('not Change')
      }
      else {
        // viewer ? (viewer.currentScaleValue = controller.currentScale ? controller.currentScale : 'auto') : console.log('resize') // auto, page-actual
      }

      viewer ? (viewer.currentScaleValue = controller.currentScale ? controller.currentScale : 'auto') : console.log('resize') // auto, page-actual
    }
    */

    viewer ? (viewer.currentScaleValue = controller.currentScale ? controller.currentScale : 'auto') : console.log('resize')
  }

  useEffect(() => {
    !loaded ? fetchPdf() : console.log('fetch pdf')

    if(pdfRefViewer.current && pdfRefViewer.current.children.length > 0) {
      setPdfRef(pdfRefViewer.current.children[0].clientWidth)
    }

    scaleChange()
  },
  [controller, pdfRefViewer, windowSize])

  return (
    <React.Fragment>
      <ThumbnailViewer />
      {
        controller.viewType !== 'COMPLETE' ?
          <div
            id="viewerContainer"
            className="viewerContainer pdf-wrap"
          >
            {
              loaded ?
                <React.Fragment>
                  <div
                    id="viewer"
                    className="pdfViewer pdf-inner"
                    ref={pdfRefViewer}
                  >
                  </div>
                </React.Fragment>
              : ''
            }
            {
              // FIXME: 타이밍 이상..
              // pdfref 각 페이지로딩 타이밍 분석해야 함..
              (controller.viewType === 'SIGNER' || controller.viewType === 'PREVIEW') && pdfRef ?
                <React.Fragment>
                  <PreViewer />
                  <Follower
                    pdfRef={pdfRef}
                    pageNum={pageNum}
                  />
                </React.Fragment>
              : ''
            }
          </div>
        : <CompleteViewer />
      }
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    controller: state.controller,
    composer: state.composer
  }
}

const actionCreators = {
  loading: loaderActions.loading
}

export default connect(
  mapStateToProps,
  actionCreators
)(Viewer)
