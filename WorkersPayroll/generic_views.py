from typing import Any, Dict, List
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.core.paginator import Paginator, Page
from django.views import View
from django.utils.decorators import method_decorator

from WorkersPayroll.defaults import get_default_results
from WorkersPayroll.decorators import auth_required


class GenericListView(View):
    @method_decorator(auth_required)
    def get(self, request: HttpRequest) -> HttpResponse:
        params: Dict[str, Any] = self._get_parameters(request)

        items_list: list[Dict[Any, Any]] = self._get_items(params)
        paginator = Paginator(
            items_list, per_page=params.get("items", 10), allow_empty_first_page=True
        )
        current_page: Page = paginator.get_page(params.get("page_no"))
        results = get_default_results()
        results["results"] = self._get_current_page(current_page)
        results["pages"] = paginator.num_pages
        results["currentPage"] = current_page.number
        results["pageRange"] = list(
            paginator.get_elided_page_range(current_page.number)
        )

        return JsonResponse(results, safe=False)

    def _get_items(self, params: Dict[str, Any]) -> list[Dict[Any, Any]]:

        return []

    def _get_parameters(self, request: HttpRequest) -> Dict[str, Any]:
        results: Dict[str, Any] = {}
        try:
            results["page_no"] = int(request.GET.get("page", "1"))
        except ValueError:
            results["page_no"] = 1
        try:
            results["items"] = int(request.GET.get("items", 10))
        except ValueError:
            results["items"] = 10

        return results

    def _get_current_page(self, current_page: Page) -> List[Dict[str, Any]]:
        return []
